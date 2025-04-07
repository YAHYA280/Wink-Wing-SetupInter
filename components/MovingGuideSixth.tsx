"use client";

import { useMovingGuideData } from "@/services/translationService";

export default function MovingGuideSixth() {
  const { data: translations } = useMovingGuideData();

  // Extract translations with fallbacks
  const title =
    translations?.WriteAnIntroductionLetter?.title ||
    "6. Write an introduction letter";
  const text =
    translations?.WriteAnIntroductionLetter?.text ||
    "In the competitive rental market, reliability is crucial. A convincing introduction letter, which we call a 'rental pitch,' can really make a difference.";

  return (
    <div className="flex flex-col gap-8 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">{title}</h1>
      <p className="text-[16px] leading-[24px]">{text}</p>
    </div>
  );
}
