import React from "react";

const LoadingSpinner: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/60 dark:bg-black/60 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 border-solid"></div>
  </div>
);

export default LoadingSpinner;
