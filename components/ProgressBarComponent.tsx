"use client";
// progressbar
import ProgressBar from "@ramonak/react-progress-bar";

// context
import { useProgress } from "@/context/progressContext";

export default function ProgressBarComponent() {
  const { currentStep, progressPercentage, totalSteps } = useProgress();
  return (
    <div className="flex flex-col gap-1 items-end">
      <h3 className="text-[16px] leading-[24px]">
        {currentStep} / {totalSteps} Completed
      </h3>
      <ProgressBar
        className="w-full sm:w-[300px] md:w-[500px]"
        bgColor="#FF4907"
        baseBgColor="#E9ECEF"
        transitionDuration="1"
        labelColor="transparent"
        completed={progressPercentage}
      />
    </div>
  );
}
