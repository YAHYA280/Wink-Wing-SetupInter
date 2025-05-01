"use client";
// context
import { useProgress } from "@/context/progressContext";

export default function DashboardInfoMovingGuide({
  translationData,
}: {
  translationData?: any;
}) {
  const { currentStep, totalSteps } = useProgress();
  
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-lg text-[#19191A]">
        {translationData?.title || "Moving Guide"}
      </h1>
      <span className="font-bold text-[24px] leading-[29px]">
        {currentStep} / {totalSteps}
      </span>
    </div>
  );
}
