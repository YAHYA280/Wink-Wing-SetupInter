"use client";
// next
import { useState, useEffect, useMemo } from "react";

// components
import RecentMatchCard from "@/components/RecentMatchCard";

// react tabs
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

// utils
import { getAllListings } from "@/utils/listings";

// context
import { useAppSelector } from "@/store/hooks/hooks";

// translation service
import { useMatchesData } from "@/services/translationService";
import { usePathname } from "next/navigation";

export default function RecentMatches() {
  const { token } = useAppSelector((state) => state.auth);
  const [matches, setMatches] = useState<any[]>([]);

  // Get the current locale and fetch translations
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: matchesData, status } = useMatchesData();

  // Default content for fallback
  const defaultMatchesContent = {
    search_placeholder: "Search by address",
    sort_options: {
      most_recent: "Most recent",
      price_low_high: "Price (low - high)",
      surface_high_low: "Surface (high - low)",
    },
    tab_labels: {
      all: "All",
      new: "New",
      favorite: "Favorite",
      registered: "Registered",
    },
    no_matches_text: "No matches",
  };

  // Merge API data with defaults using useMemo
  const content = useMemo(() => {
    if (status === "success" && matchesData) {
      return {
        ...defaultMatchesContent,
        ...matchesData,
      };
    }
    return defaultMatchesContent;
  }, [matchesData, status]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await getAllListings(2, 50, token!);
        setMatches(res);
      } catch (e) {
        console.error(e);
      }
    };

    if (token) {
      fetchMatches();
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-[45px] py-[200px] px-2 max-w-[800px] mx-auto">
      <div className="flex flex-col gap-8 sm:flex-row items-center justify-between">
        <input
          className="border px-4 py-2 w-full sm:w-[374px] rounded-lg border-[#CED4D9] text-[#212529]"
          type="text"
          placeholder={content.search_placeholder}
        />
        <select className="border px-4 py-2 w-full sm:w-[374px] rounded-lg border-[#CED4D9] text-[#212529]">
          <option value="MOST_RECENT">{content.sort_options.most_recent}</option>
          <option value="PRICE">{content.sort_options.price_low_high}</option>
          <option value="SURFACE">{content.sort_options.surface_high_low}</option>
        </select>
      </div>
      <Tabs>
        <TabList className="flex flex-col sm:flex-row items-center justify-between bg-[#F8F8F8] p-2 rounded-[8px]">
          <Tab
            selectedClassName="bg-white shadow rounded-lg text-main"
            className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
          >
            {content.tab_labels.all}
          </Tab>
          <Tab
            selectedClassName="bg-white shadow rounded-lg text-main"
            className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
          >
            {content.tab_labels.new}
          </Tab>
          <Tab
            selectedClassName="bg-white shadow rounded-lg text-main"
            className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
          >
            {content.tab_labels.favorite}
          </Tab>
          <Tab
            selectedClassName="bg-white shadow rounded-lg text-main"
            className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
          >
            {content.tab_labels.registered}
          </Tab>
        </TabList>

        <TabPanel className="mt-[45px]">
          {matches.length ? (
            <div className="flex flex-col gap-6 items-center justify-center sm:flex-row sm:flex-wrap lg:justify-between">
              {matches.map((match) => (
                <RecentMatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <h1 className="flex items-center justify-center mt-24 text-3xl font-medium uppercase">
              {content.no_matches_text}
            </h1>
          )}
        </TabPanel>
        <TabPanel>no data</TabPanel>
        <TabPanel>no data</TabPanel>
        <TabPanel>no data</TabPanel>
      </Tabs>
    </div>
  );
}