"use client";
import { useMovingGuideData } from "@/services/translationService";
import Markdown from "markdown-to-jsx";

export default function MovingGuideForth() {
  const { data: translations } = useMovingGuideData();

  // Extract translations with fallbacks
  const title =
    translations?.CollectAllNecessaryDocuments?.title ||
    "4. Collect all necessary documents";
  const rawText =
    translations?.CollectAllNecessaryDocuments?.text ||
    "Are you going to view a property? Agents or landlords often ask for several documents to verify your identity and financial situation. Make sure you have these ready, including any documents from your partner or housemates, to send.";
  const text = rawText.replace(/\\n/g, "\n");

  return (
    <div className="flex flex-col gap-8 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">{title}</h1>
      <div className="text-[16px] leading-[24px]">
        <Markdown>{text}</Markdown>
      </div>
    </div>
  );
}
