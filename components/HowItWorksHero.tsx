"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useHowItWorksData } from "@/services/translationService";

export default function HowItWorksHero() {
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: howItWorksData, status } = useHowItWorksData();

  // Extract content from the API data with fallbacks
  const subtitle =
    howItWorksData?.subtitle || "Winkwing automates your home search.";

  // Default title with formatting
  const defaultTitle = "Find a house faster,\nwith less stress.";

  // Get title from API or use default
  const title = howItWorksData?.title || defaultTitle;

  // Process the title to handle the line break and highlight
  const titleParts = title.includes(",") ? title.split(",") : [title, ""];

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center pt-24 px-2 md:pt-[170px]">
      <h5 className="text-xl sm:text-[16px] leading-[24px] text-main">
        {subtitle}
      </h5>
      <h1 className="font-extrabold text-3xl text-[#003956] xs:text-4xl md:text-5xl md:leading-[60px]">
        {titleParts[0]}
        {titleParts.length > 1 && (
          <>
            <br />
            <span className="text-main">{titleParts[1]}</span>
          </>
        )}
      </h1>
    </div>
  );
}
