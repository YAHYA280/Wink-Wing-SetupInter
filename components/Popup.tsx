"use client";
// next
import { ReactNode, useEffect } from "react";

// context
import { usePopup } from "@/context/popupContext";

export default function Popup({ children }: { children: ReactNode }) {
  const { isOpen, hidePopup } = usePopup();

  useEffect(() => {
    window.addEventListener("click", hidePopup);
  });

  return (
    <div
      className={
        isOpen
          ? "fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-50 flex items-center justify-center h-full"
          : "hidden"
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:w-[600px] bg-white rounded-lg px-7 pt-5 pb-16 mx-4"
      >
        {children}
      </div>
    </div>
  );
}
