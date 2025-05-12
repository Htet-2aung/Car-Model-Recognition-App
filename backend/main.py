from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import torch
import easyocr
from typing import Dict
import threading

app = FastAPI()
lock = threading.Lock()

analytics = {
    "total_images": 0,
    "successful_plates": 0,
    "last_plate": "N/A"
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='/Users/htetaung/yolov5/dataset/backend/best.pt', force_reload=True)
reader = easyocr.Reader(['en'], gpu=False)  # GPU=True if CUDA is available

@app.post("/detect-plate")
async def detect_plate(file: UploadFile = File(...)):
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    if img is None:
        return {"plate": "Invalid image"}

    results = model(img)
    boxes = results.xyxy[0]

    if len(boxes) == 0:
        return {"plate": "No plate detected"}

    box = boxes[0].cpu().numpy()
    x1, y1, x2, y2 = map(int, box[:4])
    x1, y1 = max(0, x1), max(0, y1)
    x2, y2 = min(img.shape[1], x2), min(img.shape[0], y2)
    plate_crop = img[y1:y2, x1:x2]

    # OCR with EasyOCR
    result = reader.readtext(plate_crop)
    text = result[0][1] if result else "Unreadable"
    with lock:
        analytics["total_images"] += 1
        if text != "Unreadable":
            analytics["successful_plates"] += 1
            analytics["last_plate"] = text 
    return {"plate": text}


@app.get("/analytics")
def get_analytics():
    with lock:
        accuracy = (
            (analytics["successful_plates"] / analytics["total_images"]) * 100
            if analytics["total_images"] > 0 else 0.0
        )
        return {
            "total_images": analytics["total_images"],
            "successful_plates": analytics["successful_plates"],
            "accuracy": round(accuracy, 2),
            "last_plate": analytics["last_plate"]
        }
