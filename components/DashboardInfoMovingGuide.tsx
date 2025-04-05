"use client";
// context
import { useProgress } from "@/context/progressContext";

export default function DashboardInfoMovingGuide() {
  const { currentStep, totalSteps } = useProgress();
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-lg text-[#19191A]">Moving Guide</h1>
      <span className="font-bold text-[24px] leading-[29px]">
        {currentStep} / {totalSteps}
      </span>
    </div>
  );
}
