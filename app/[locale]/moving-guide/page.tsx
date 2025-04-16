"use client";
// next
import Link from "next/link";
import { useMovingGuideData } from "@/services/translationService";

// components
import ProgressBarComponent from "@/components/ProgressBarComponent";
import Checkbox from "@/components/Checkbox";
import MovingGuideFirst from "@/components/MovingGuideFirst";
import MovingGuideSecond from "@/components/MovingGuideSecond";
import MovingGuideThird from "@/components/MovingGuideThird";
import MovingGuideForth from "@/components/MovingGuideForth";
import MovingGuideFifth from "@/components/MovingGuideFifth";
import MovingGuideSixth from "@/components/MovingGuideSixth";
import MovingGuideSeventh from "@/components/MovingGuideSeventh";
import MovingGuideEighth from "@/components/MovingGuideEighth";
import MovingGuideNinth from "@/components/MovingGuideNinth";
import MovingGuideTenth from "@/components/MovingGuideTenth";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { usePathname } from "next/navigation";
import {useMemo} from "react";

// context
import { useProgress } from "@/context/progressContext";

export default function MovingGuidePage() {
  const { handleBack, handleNext, currentStep, totalSteps } = useProgress();
  const { data: translations } = useMovingGuideData();
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);

  // Extract translations with fallbacks
  const title = translations?.title || "Moving Guide";
  const prevBtn = translations?.prev_btn || "Previous";
  const nextBtn = translations?.next_btn || "Next";
  const markAsCompleted =
    translations?.mark_as_completed || "Mark as completed";

  const steps = [
    <MovingGuideFirst key="1" />,
    <MovingGuideSecond key="2" />,
    <MovingGuideThird key="3" />,
    <MovingGuideForth key="4" />,
    <MovingGuideFifth key="5" />,
    <MovingGuideSixth key="6" />,
    <MovingGuideSeventh key="7" />,
    <MovingGuideEighth key="8" />,
    <MovingGuideNinth key="9" />,
    <MovingGuideTenth key="10" />,
  ];

  return (
    <ProtectedRoutes>
      <div className="bg-[#FFF7F5] min-h-screen">
        <div className="max-w-[1164px] mx-auto py-24 sm:py-32 px-2">
          <div className="flex flex-col sm:flex-row sm:justify-between item-center justify-center gap-4">
            <h1 className="font-extrabold text-3xl md:text-4xl text-[#003956]">
              {title}
            </h1>
            <ProgressBarComponent />
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={handleBack}
              disabled={currentStep <= 0}
              className={
                currentStep > 1
                  ? "bg-main border border-main py-2 px-10 font-semibold rounded-lg text-lg text-white xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
                  : "opacity-0"
              }
            >
              {prevBtn}
            </button>
            <Link
              href={currentStep == totalSteps ? `/${locale}/dashboard` : "#!"}
              onClick={handleNext}
              className="bg-main border border-main py-2 px-10 font-semibold rounded-lg text-lg text-white xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
            >
              {nextBtn}
            </Link>
          </div>

          <div className="bg-white rounded-lg pt-5 pb-12 px-7 w-full mt-20">
            <div className="flex items-center gap-3 border-b pb-3">
              <label className="flex items-center gap-3 relative">
                <Checkbox id={String(currentStep)} />
                <span className="text-[16px] leading-[24px] text-black cursor-pointer">
                  {markAsCompleted}
                </span>
              </label>
            </div>
            {steps[currentStep - 1]}
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
