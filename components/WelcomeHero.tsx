"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useWelcomeData } from "@/services/translationService";

export default function WelcomeHero() {
  // Get the current locale from the URL
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  
  // Fetch translations
  const { data: welcomeData, status } = useWelcomeData();

  // Default content for fallback
  const defaultContent = {
    hero_title: "Frequently Asked Questions",
    without_title: "Searching for a house without Winkwing",
    without_data: {
      list: [
        "❌ Spend hours looking on a few websites",
        "❌ Be too late to apply for the viewing",
        "❌ Not getting a reaction from the landlord",
        "❌ Miss listings from lesser known websites"
      ]
    },
    with_title: "Searching for a house with Winkwing",
    with_data: {
      list: [
        "✅ Receive live notifications from 750 websites",
        "✅ Be one of the first to apply for the viewing",
        "✅ Get invited for viewings more regularly",
        "✅ Find listings on 96% of all rental websites"
      ]
    }
  };

  // Merge API data with defaults using useMemo
  const content = useMemo(() => {
    if (status === "success" && welcomeData?.welcome_hero) {
      return welcomeData.welcome_hero;
    }
    return defaultContent;
  }, [welcomeData, status]);

  return (
    <div className="py-24 px-2 min-h-screen flex flex-col-reverse items-center justify-center gap-20 lg:flex-col md:pb-24">
      <div className="flex flex-col items-center justify-center sm:flex-row sm:flex-wrap gap-6">
        <img src="/aftersignup-image.png" alt="Image One" />
        <img src="/aftersignup-image-2.png" alt="Image Two" />
        <img src="/aftersignup-image-3.png" alt="Image Three" />
      </div>
      <div>
        <h1 className="font-bold text-center text-4xl font-arial mb-[80px] text-[#003956] md:text-[48px] leading-[50px]">
          {content.hero_title}
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-[140px] px-2">
          <div className="text-center lg:text-left">
            <h3 className="font-bold text-[24px] leading-[29px] mb-[35px]">
              {content.without_title}
            </h3>
            <ul className="flex flex-col items-center justify-start lg:items-start gap-7">
              {content.without_data.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="text-center lg:text-left">
            <h3 className="font-bold text-[24px] leading-[29px] mb-[35px]">
              {content.with_title}
            </h3>
            <ul className="flex flex-col items-center justify-start lg:items-start gap-7">
              {content.with_data.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}