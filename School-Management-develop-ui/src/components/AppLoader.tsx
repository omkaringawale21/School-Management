"use client";

import Image from "next/image";
import React from "react";

const AppLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-34 backdrop-blur-sm z-50 flex justify-center items-center flex-col">
      <Image
        src="/applogon.svg"
        alt="Loading"
        width={150}
        height={150}
        className="loader-image"
      />
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }
        .loader-image {
          width: 100px; /* Adjust size as needed */
          height: auto; /* Maintain aspect ratio */
          position: absolute; /* Position it over the loader */
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AppLoader;
