"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dashboard from "@/components/dashboard";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
    } else {
      alert("Please select a video file to upload.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-pink-200 p-6">
      <Dashboard />
      <div className="flex flex-col items-center justify-center mt-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 shadow-lg">
          Upload Your Video
        </h1>
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
          <label
            htmlFor="videoUpload"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Choose a video file
          </label>
          <Input
            type="file"
            id="videoUpload"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {selectedFile && (
            <p className="text-sm text-gray-600 mt-2">
              Selected File: <span className="font-medium">{selectedFile.name}</span>
            </p>
          )}
          <Button
            onClick={handleUpload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 ease-in-out"
          >
            Upload Video
          </Button>
        </div>
      </div>
    </div>
  );
}