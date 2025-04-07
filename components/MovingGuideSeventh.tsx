"use client";

import { useMovingGuideData } from "@/services/translationService";
import Markdown from "markdown-to-jsx";

export default function MovingGuideSeventh() {
  const { data: translations } = useMovingGuideData();

  // Extract translations with fallbacks
  const title =
    translations?.SignUpForFacebookGroups?.title ||
    "7. Sign up for Facebook groups";
  const text =
    translations?.SignUpForFacebookGroups?.text ||
    "Especially with private landlords who are temporarily renting out a property or room, Facebook is a popular platform. Join local Facebook groups focused on rental properties. Most of these groups can be found by searching for 'Renting + your town or municipality' and 'Properties + your town or municipality.'";

  return (
    <div className="flex flex-col gap-8 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">{title}</h1>
      <div className="text-[16px] leading-[24px]">
        <Markdown>{text}</Markdown>
      </div>
    </div>
  );
}
