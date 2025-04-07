"use client";

import { useMovingGuideData } from "@/services/translationService";

export default function MovingGuideFifth() {
  const { data: translations } = useMovingGuideData();

  // Extract translations with fallbacks
  const title = translations?.SpreadTheWord?.title || "5. Spread the word";
  const text =
    translations?.SpreadTheWord?.text ||
    "Inform your network: send a message to friends, colleagues, and sports buddies via WhatsApp. Maybe someone is moving soon or something will become available in someone's apartment.";

  return (
    <div className="flex flex-col gap-8 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">{title}</h1>
      <p className="text-[16px] leading-[24px]">{text}</p>
    </div>
  );
}
