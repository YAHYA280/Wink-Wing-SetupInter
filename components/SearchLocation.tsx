"use client";
import SearchMenu from "./SearchMenu";
import ServicesCard from "./ServicesCard";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useHomePageData } from "@/services/translationService";

// Default fallback data matching the SearchMenu structure
const defaultSearchMenuContent = {
  id: 0, // default id if needed
  title: "Stay one step ahead!",
  services: [
    {
      id: 1,
      icon: "/search-icon-1.svg",
      text: "Tell us what type of house you are looking for and sit back while we scan more than 750+ rental websites to find your ideal home.",
      title: "Automate your search",
    },
    {
      id: 2,
      icon: "/search-icon-2.svg",
      text: "When we find a house that matches your preferences, you receive a notification on WhatsApp or e-mail within seconds.",
      title: "Receive real-time alerts",
    },
    {
      id: 3,
      icon: "/search-icon-3.svg",
      text: "Tell us what type of house you are looking for and sit back while we scan more than 750+ rental websites to find your ideal home.",
      title: "Less stress, more viewings",
    },
  ],
  boxSubtitle: "Select location based on",
  tablist: [
    { type: "NEIGHBOURHOODS", index: 0, title: "Neighbourhoods" },
    { type: "RADIUS", index: 1, title: "Radius" },
    { type: "TRAVEL_TIME", index: 2, title: "Travel Time" },
  ],
  city_dropdown_label: "City",
  neighbourgoods_dropdown_label: "Neighbourhoods",
  radius_dropdown_label: "Radius",
  I_need_to_live_near: "I need to live near",
  max_travel_time: "Max travel time",
  transport_type: "Transport type",
  button: "Start your search",
};

export default function SearchLocation() {
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: homePageData, status } = useHomePageData();

  // Merge fetched data with defaults so that all properties are defined.
  const searchContent = useMemo(() => {
    if (status === "success" && homePageData?.SearchMenu) {
      return {
        ...defaultSearchMenuContent,
        ...homePageData.SearchMenu,
      };
    }
    return defaultSearchMenuContent;
  }, [homePageData, status]);

  return (
    <div className="w-full bg-searchLocation bg-cover bg-center relative z-30">
      <div className="flex flex-col items-center justify-center gap-16 px-2 py-24">
        <h1 className="font-extrabold text-4xl md:text-[44px] leading-[44px] text-center">
          {searchContent.title}
        </h1>
        <div className="flex flex-col items-center justify-center gap-12 px-2 md:flex-row md:flex-wrap">
          {searchContent.services.map((service) => (
            <ServicesCard key={service.id} service={service} />
          ))}
        </div>
        <SearchMenu content={searchContent} />
      </div>
    </div>
  );
}
