"use client";

import { useMovingGuideData } from "@/services/translationService";

export default function MovingGuideForth() {
  const { data: translations } = useMovingGuideData();

  // Extract translations with fallbacks
  const title =
    translations?.CollectAllNecessaryDocuments?.title ||
    "4. Collect all necessary documents";
  const text =
    translations?.CollectAllNecessaryDocuments?.text ||
    "Are you going to view a property? Agents or landlords often ask for several documents to verify your identity and financial situation. Make sure you have these ready, including any documents from your partner or housemates, to send.";

  return (
    <div className="flex flex-col gap-8 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">{title}</h1>
      <p className="text-[16px] leading-[24px]">{text}</p>
    </div>
  );
}
