import React, { useState } from "react";
import axios from "axios";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect } from "react";
import {
  Camera,
  ScanText,
  SlidersHorizontal,
  Server,
  MonitorSmartphone,
  Timer,
  Network,
  Sparkles,
  Rocket,
} from "lucide-react";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState(null);
  const [showDocs, setShowDocs] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file instanceof File) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      console.error("Invalid file selected");
      setPreview(null);
    }
  }; 

  const features = [
  {
    title: "YOLOv5 Detection",
    desc: "Custom-trained YOLOv5 model detects license plates with high accuracy and speed.",
    icon: <Camera className="text-[#0052FF] w-5 h-5" />,
  },
  {
    title: "Tesseract OCR",
    desc: "Extracts characters from plates using advanced image preprocessing and character whitelisting.",
    icon: <ScanText className="text-[#0052FF] w-5 h-5" />,
  },
  {
    title: "OpenCV Preprocessing",
    desc: "Applies contrast enhancement, bilateral filtering, sharpening, and adaptive thresholding.",
    icon: <SlidersHorizontal className="text-[#0052FF] w-5 h-5" />,
  },
  {
    title: "FastAPI Backend",
    desc: "Handles image uploads, model inference, and OCR using a lightweight Python server.",
    icon: <Server className="text-[#0052FF] w-5 h-5" />,
  },
  {
    title: "React + Tailwind Frontend",
    desc: "Modern, responsive interface for uploading and viewing plate recognition results.",
    icon: <MonitorSmartphone className="text-[#0052FF] w-5 h-5" />,
  },
  {
    title: "Optimized for Speed",
    desc: "Fast response time with CPU-based inference. Real-time-ready on edge devices.",
    icon: <Timer className="text-[#0052FF] w-5 h-5" />,
  },
  {
    title: "CORS & API Integration",
    desc: "Seamless backend communication via secure API endpoints with CORS enabled.",
    icon: <Network className="text-[#0052FF] w-5 h-5" />,
  },
  {
    title: "Lottie Animations",
    desc: "Enhanced user experience through playful and engaging animations.",
    icon: <Sparkles className="text-[#0052FF] w-5 h-5" />,
  },
  {
    title: "Future-Ready Architecture",
    desc: "Planned support for multilingual OCR, video streams, and multiple plate detection.",
    icon: <Rocket className="text-[#0052FF] w-5 h-5" />,
  },
];


  const [menuOpen, setMenuOpen] = useState(false);
const [analytics, setAnalytics] = useState(null);

useEffect(() => {
  const interval = setInterval(() => {
    fetch("http://localhost:8001/analytics")
      .then((res) => res.json())
      .then((data) => setAnalytics(data));
  }, 5000);

  return () => clearInterval(interval);
}, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post("http://localhost:8001/detect-plate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(res.data.plate);
    } catch (err) {
      console.error(err);
      setResult("Detection failed");
    }
  };

  const toggleDocs = () => {
    setShowDocs(!showDocs);
  };

  return (
   <div className="text-black bg-white font-inter min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 border-b border-gray-200 relative">
        <span className="text-blue-500 text-xl font-bold">PLATE RECOGNIZER</span>

        <div className="flex items-center space-x-4 relative">
          {/* Menu Toggle Button */}
         <button
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Menu"
  className={`flex flex-col justify-center space-y-1.5 transition-transform duration-300 hover:rotate-180`}
>
  <span className="block w-7 h-[2.5px] bg-black rounded"></span>
  <span className="block w-7 h-[2.5px] bg-black rounded"></span>
  <span className="block w-7 h-[2.5px] bg-black rounded"></span>
</button>


          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-14 right-0 bg-white border rounded shadow p-3 space-y-2 z-50">
              <p className="text-sm cursor-pointer hover:text-blue-600 hover:text-blue-600 transition-colors duration-200">About us</p>
              <p className="text-sm cursor-pointer hover:text-blue-600 hover:text-blue-600 transition-colors duration-200">Documentation</p>
              <p className="text-sm cursor-pointer hover:text-blue-600 hover:text-blue-600 transition-colors duration-200">Hi</p>
            </div>
          )}

          <button className="bg-[#001F4D] text-white text-base font-normal px-4 py-2 rounded">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#0052FF] px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 text-white">
          {/* Lottie Animation */}
          <div className="w-[150px] h-[150px] shrink-0">
            <DotLottieReact
              src="https://lottie.host/904bacc4-8abc-4ece-a7eb-d8ec041df0e5/dpHovFAC5Q.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
              Accurate, Fast, User-Friendly Plate Recognizer
            </h1>
            <p className="text-white text-base mt-3 max-w-lg">
              Automatic License Plate App that works in all environments, optimized for speed and accuracy.
            </p>

            <div className="mt-6 space-y-3">
              <button className="bg-white text-[#0052FF] font-bold text-lg rounded px-6 py-3 w-full max-w-xs transition-transform duration-200 hover:scale-105 hover:shadow-md">
  Get Started
</button>

<button className="bg-white text-[#0052FF] font-bold text-lg rounded px-6 py-3 w-full max-w-xs flex items-center justify-center space-x-2 transition-transform duration-200 hover:scale-105 hover:shadow-md">
  <i className="fab fa-youtube text-[#0052FF] text-xl"></i>
  <span>Contact Us</span>
</button>
            </div>

            <div className="flex flex-wrap gap-2 mt-6 max-w-sm">
              {[ "YOLOv5",
  "Tesseract OCR",
  "EasyOCR",
  "FastAPI",
  "Tailwind CSS",
  "React.js",
  "Torch",
  "OpenCV"].map((tag, index) => (
                <button
                  key={index}
                  className="border border-white text-white text-xs font-medium rounded px-3 py-1"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <section className="w-full max-w-md ml-8 mt-6 bg-[#F9FAFB] rounded-md px-7 py-7">


        <h2 className="text-[#001F4D] font-extrabold text-lg mb-4 text-center">Try it out</h2>
        <p className =" text-[#001F4D] text-xs font-medium rounded px-3 py-1">
          Upload an image (up to 3MB) and we’ll decode the license plate.
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full mb-4 rounded shadow"
          />
        )}
        <button
          className= "bg-[#0052FF] text-[#ffffff] font-bold text-lg rounded px-6 py-3 w-full max-w-xs transition-transform duration-200 hover:scale-105 hover:shadow-md"
          onClick={handleUpload}
        >
          Detect Plate
        </button>
        {result && (
          <p className="text-center mt-4 text-lg font-semibold text-[#001F4D]">
            Detected Plate: {result}
          </p>
        )}
        <button
          onClick={toggleDocs}
          className="text-xs text-blue-500 underline mt-4 block text-center"
        >
          {showDocs ? "Hide Documentation" : "Show Documentation"}
        </button>
      </section>
        </div>
      </section>
    <section className="bg-white py-12 px-4">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-[#001F4D] mb-10">
      App Features & Techniques
    </h2>
<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-sm text-gray-700">
  {features.map((item, i) => (
    <div
      key={i}
      className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-2">
        {item.icon}
        <h3 className="text-[#0052FF] font-semibold text-base">{item.title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
    </div>
  ))}
</div>

  </div>
</section>


 {analytics && (
  <div className="bg-gray-50 border rounded-lg p-4 mt-6 max-w-md mx-auto shadow-sm">
    <h3 className="text-lg font-bold text-[#0052FF] mb-2">📈 Real-Time Analytics</h3>
    <p>Total Images Processed: <strong>{analytics.total_images}</strong></p>
    <p>Plates Detected: <strong>{analytics.successful_plates}</strong></p>
    <p>Accuracy: <strong>{analytics.accuracy}%</strong></p>
    <p>Last Detected Plate: <strong>{analytics.last_plate}</strong></p>
  </div>
)}


    
      {showDocs && (
        <section className="max-w-md mx-auto mt-6 bg-[#F9FAFB] rounded-md p-6">
          <h2 className="text-[#001F4D] font-extrabold text-lg mb-4 text-center">Documentation</h2>
          <p className="text-gray-700 text-sm">
            This application allows you to upload an image of a car, and it will detect the license plate number.
            <br /><br />
            <strong>How to use:</strong>
            <ol className="list-decimal ml-5">
              <li>Select an image file of a car</li>
              <li>Click the "Detect Plate" button</li>
              <li>The detected license plate will appear below</li>
            </ol>
          </p>
        </section>
      )}

      
    </div>
  );
}

export default App;
