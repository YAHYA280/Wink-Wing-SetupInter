"use client";
import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex items-center justify-center mb-4">
          <div
            className="w-3 h-3 bg-main rounded-full mr-1 animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-main rounded-full mr-1 animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-main rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
        <p className="text-[#003956] font-semibold">Saving your search...</p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
