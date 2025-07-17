import React from "react";
import '../../style/layout/loading.css'

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-10 h-10 border-4 border-t-yellow-500 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
