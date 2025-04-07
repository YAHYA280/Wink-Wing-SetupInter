"use client";

import { useMovingGuideData } from "@/services/translationService";
import Markdown from "markdown-to-jsx";

export default function MovingGuideEighth() {
  const { data: translations } = useMovingGuideData();

  // Extract translations with fallbacks
  const title =
    translations?.SignUpForNewConstructionProjects?.title ||
    "8. Sign up for new construction projects";
  const text =
    translations?.SignUpForNewConstructionProjects?.text ||
    "For those who have patience in the property search, following new construction projects is a smart move. Keep in mind that there may be a waiting period of up to two years from announcement to key handover. For a complete overview of current and upcoming projects, visit nieuwbouw.nl.";

  return (
    <div className="flex flex-col gap-8 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">{title}</h1>
      <div className="text-[16px] leading-[24px]">
        <Markdown>{text}</Markdown>
      </div>
    </div>
  );
}
