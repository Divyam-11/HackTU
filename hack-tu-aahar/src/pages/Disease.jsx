import React, { useState } from "react";
import { ShieldCheck, CheckCircle, TrendingUp, Droplet } from "lucide-react";
const CircularProgressBar = ({ percent, color }) => {
  const displayPercent = Math.max(0, Math.min(100, percent));
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (displayPercent / 100) * circumference;

  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#e5e5e5"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={color || "currentColor"}
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-gray-700">%</span>
      </div>
    </div>
  );
};

const DiseaseDetection = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // State to store the preview image
  const fileInputRef = React.useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Generate a temporary URL for the file
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    const formData = new FormData();
    const file = fileInputRef.current.files[0];

    if (!file) {
      setError("Please select a file.");
      return;
    }

    formData.append("file", file);

    try {
      const response = await fetch(
        "https://diseasedetectionrend.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch prediction.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Main Grid Container */}
      <div className="grid grid-cols-2 gap-8 max-w-6xl w-full bg-white rounded-lg shadow-lg">
        {/* Left Side: Centered Form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-sm">
            {/* Header with Icon */}
            <div className="flex items-center space-x-3 mb-8">
              <ShieldCheck className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Disease Detection
              </h1>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  name="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  onChange={handleFileChange} // Handle file change event
                />
              </div>
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Uploaded Preview"
                    className="w-full h-auto rounded-lg shadow"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Predict
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm mt-4">Error: {error}</div>
            )}
          </div>
        </div>

        {/* Right Side: Prediction Results */}
        <div className="space-y-6 p-8">
          {result ? (
            <>
              <div className="text-center">
                <h2 className="text-lg font-bold text-indigo-600">
                  Disease Detection Result
                </h2>
              </div>
              <div className="grid gap-4">
                {/* Prediction Box */}
                <div className="flex items-center bg-white rounded-lg p-4 shadow">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-4" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Prediction:
                    </p>
                    <p className="text-sm text-gray-700">{result.prediction}</p>
                  </div>
                </div>

                {/* Confidence Box */}
                <div className="flex items-center bg-white rounded-lg p-4 shadow">
                  <TrendingUp className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Confidence:
                    </p>
                    <p className="text-sm text-gray-700">
                      {result.confidence}%
                    </p>
                  </div>
                </div>

                {/* Fertilizer Box */}
                <div className="flex items-center bg-white rounded-lg p-4 shadow">
                  <Droplet className="h-6 w-6 text-purple-600 mr-4" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Fertilizer:
                    </p>
                    <p className="text-sm text-gray-700">{result.fertilizer}</p>
                  </div>
                </div>

                {/* Treatment Box */}
                <div className="flex items-center bg-white rounded-lg p-4 shadow">
                  <ShieldCheck className="h-6 w-6 text-indigo-600 mr-4" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Treatment:
                    </p>
                    <p className="text-sm text-gray-700">{result.treatment}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-center">
              Upload an image to see the predictions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
