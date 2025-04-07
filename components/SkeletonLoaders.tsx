// components/SkeletonLoaders.tsx
"use client";

export function SkeletonDropdown() {
  return (
    <div className="animate-pulse">
      <div className="h-5 w-20 bg-gray-200 mb-1 rounded"></div>
      <div className="h-10 w-[320px] bg-gray-200 rounded-lg"></div>
    </div>
  );
}

export function SkeletonLocationTab() {
  return (
    <div className="animate-pulse">
      <div className="h-[50px] bg-gray-200 rounded-lg w-full mb-4"></div>
      <div className="flex flex-col gap-4">
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </div>
  );
}
