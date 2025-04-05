"use client";
import React from "react";

const SuccessAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2 success-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-500 success-checkmark"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
            className="success-path"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-[#003956] success-title">
        Search Saved Successfully!
      </h3>
      <p className="text-gray-600 success-message">
        Your search has been saved. You will now receive notifications based on
        your preferences.
      </p>

      <style jsx>{`
        .success-checkmark {
          opacity: 0;
          animation: checkmark 0.8s ease-in-out forwards;
        }

        .success-path {
          stroke-dasharray: 22;
          stroke-dashoffset: 22;
          animation: dash 0.8s ease-in-out forwards 0.2s;
        }

        .success-icon-container {
          position: relative;
        }

        .success-icon-container::after {
          content: "";
          position: absolute;
          inset: 0;
          border: 4px solid #10b981;
          border-radius: 50%;
          animation: ripple 1.5s ease-out infinite;
        }

        .success-title {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards 0.4s;
        }

        .success-message {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.8s ease-out forwards 0.6s;
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes checkmark {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessAnimation;
