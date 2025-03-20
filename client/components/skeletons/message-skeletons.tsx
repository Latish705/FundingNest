import React from "react";

const MessagePageSkeleton = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Skeleton for the header */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Skeleton for conversation list items */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-2 animate-pulse"
        >
          <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default MessagePageSkeleton;
