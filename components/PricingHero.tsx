"use client";

import { useMemo } from "react";
import { usePricingData } from "@/services/translationService";

// Default content as fallback
const defaultPricingHeroContent = {
  subtitle: "Get more WinkWing, pay less.",
  title: "Find your new home, the easy way.",
};

export default function PricingHero() {
  // Get translations
  const { data: pricingData, status } = usePricingData();

  // Merge API data with defaults using useMemo
  const pricingContent = useMemo(() => {
    if (status === "success" && pricingData) {
      return {
        subtitle: pricingData.subtitle || defaultPricingHeroContent.subtitle,
        title: pricingData.title || defaultPricingHeroContent.title,
      };
    }
    return defaultPricingHeroContent;
  }, [pricingData, status]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center py-24 px-2 md:pt-[170px]">
      <h5 className="text-xl sm:text-[16px] leading-[24px] text-main">
        {pricingContent.subtitle}
      </h5>
      <h1 className="font-extrabold text-3xl text-[#003956] xs:text-4xl md:text-5xl md:leading-[60px] max-w-[500px]">
        {pricingContent.title}
      </h1>
    </div>
  );
}
