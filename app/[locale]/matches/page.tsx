"use client";
// next
import { useState, useEffect } from "react";

// components
import RecentMatchCard from "@/components/RecentMatchCard";

// react tabs
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

// utils
import { getAllListings } from "@/utils/listings";

// context
import { useAppSelector } from "@/store/hooks/hooks";

export default function RecentMatches() {
  const { token } = useAppSelector((state) => state.auth);

  const [matches, setMatches] = useState<any[]>([]);

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
          className="border px-4 py-2 w-full sm:w-[374px] rounded-lg  border-[#CED4D9] text-[#212529]"
          type="text"
          placeholder="Search by address"
        />
        <select className="border px-4 py-2 w-full sm:w-[374px] rounded-lg  border-[#CED4D9] text-[#212529]">
          <option value="MOST_RECENT">Most recent</option>
          <option value="PRICE">Price (low - high)</option>
          <option value="SURFACE">Surface (high - low)</option>
        </select>
      </div>
      <Tabs>
        <TabList className="flex flex-col sm:flex-row items-center justify-between bg-[#F8F8F8] p-2 rounded-[8px]">
          <Tab
            selectedClassName="bg-white shadow rounded-lg text-main"
            className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
          >
            All
          </Tab>
          <Tab
            selectedClassName="bg-white shadow rounded-lg text-main"
            className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
          >
            New
          </Tab>
          <Tab
            selectedClassName="bg-white shadow rounded-lg text-main"
            className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
          >
            Favorite
          </Tab>
          <Tab
            selectedClassName="bg-white shadow rounded-lg text-main"
            className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
          >
            Registered
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
              No matches
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
