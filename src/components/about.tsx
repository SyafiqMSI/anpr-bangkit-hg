"use client";

import React from "react";

const AboutSection = () => {
  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Application</h2>
      <p className="text-gray-600">
        This application allows users to upload and manage their video files seamlessly. 
        With a user-friendly interface and efficient upload process, you can easily store and 
        access your videos anytime, anywhere.
      </p>
      <p className="text-gray-600 mt-2">
        Our goal is to provide a simple and effective way to handle video content, 
        making it accessible for everyone.
      </p>
    </div>
  );
};

export default AboutSection;