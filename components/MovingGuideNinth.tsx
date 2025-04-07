"use client";

import { useMovingGuideData } from "@/services/translationService";

export default function MovingGuideNinth() {
  const { data: translations } = useMovingGuideData();

  // Extract translations with fallbacks
  const title =
    translations?.CleanUpYourOnlinePresence?.title ||
    "9. Clean up your online presence";
  const text =
    translations?.CleanUpYourOnlinePresence?.text ||
    "Check how you come across online to an agent who may be researching your profiles. Make sure you have a professional LinkedIn page and balance your Instagram feed with more than just your nightlife adventures. While not all agents do this, a positive online impression can certainly work in your favor.";

  return (
    <div className="flex flex-col gap-8 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">{title}</h1>
      <p className="text-[16px] leading-[24px]">{text}</p>
    </div>
  );
}
