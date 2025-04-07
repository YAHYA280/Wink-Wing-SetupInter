"use client";

import { useMovingGuideData } from "@/services/translationService";
import Markdown from "markdown-to-jsx";

export default function MovingGuideTenth() {
  const { data: translations } = useMovingGuideData();

  // Extract translations with fallbacks
  const title =
    translations?.ReadOurViewingTips?.title || "10. Read our viewing tips";
  const text =
    translations?.ReadOurViewingTips?.text ||
    "When you're invited to a viewing, it's go time. Here are the 4 most important tips to ensure you stand out during a viewing and have the best chance of being selected:";

  return (
    <div className="flex flex-col gap-8 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">{title}</h1>
      <div className="text-[16px] leading-[24px]">
        <Markdown>{text}</Markdown>
      </div>
    </div>
  );
}
