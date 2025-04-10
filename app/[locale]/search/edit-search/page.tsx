"use client";
// next
import { useMemo } from "react";
import { usePathname } from "next/navigation";

// components
import SignUpLocation from "@/components/SignUpLocation";
import SignUpRequirements from "@/components/SignUpRequirements";
import SignUpDetails from "@/components/SignUpDetails";

// Translation service
import { useSearchData } from "@/services/translationService";

export default function EditSearch() {
  // Get the current locale from the URL
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  
  // Fetch translations
  const { data: searchData, status } = useSearchData();

  // Default content for fallback
  const defaultContent = {
    title: "Find your new home the easy way",
    subtitle: "Redefine your search",
    text: "Tailor your search to your unique preferences—location, budget, and features—to receive quality notifications based on your needs.",
    prv: "Previous",
    save: "Save",
    saving: "Saving...",
    edit_subtitle: "Edit your search",
    county_eror: "Please select a city/country first",
    adress_eror: "Please enter an address",
    adress_valid: "Please select a valid address from the suggestions"
  };

  // Merge API data with defaults using useMemo
  const content = useMemo(() => {
    if (status === "success" && searchData?.hero) {
      return searchData.hero;
    }
    return defaultContent;
  }, [searchData, status]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-[120px] px-2 bg-[#FFF7F5]">
      <div className="flex flex-col items-center justify-center gap-4 text-center lg:text-left lg:items-start relative to-zinc-100">
        <h5 className="text-[16px] leading-[24px] text-main">
          {content.title}
        </h5>
        <h1 className="flex flex-col sm:flex-row items-center gap-4 font-extrabold text-3xl xs:text-4xl md:text-5xl md:leading-[60px] text-[#003956]">
          {content.edit_subtitle}
        </h1>
        <p className="text-[16px] leading-[24px] max-w-[730px]">
          {content.text}
        </p>
      </div>
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg w-full sm:w-[630px] md:w-[730px] shadow">
        <SignUpLocation />
        <SignUpRequirements />
        <SignUpDetails />

        <button className="bg-main border border-main py-2 px-8 rounded-lg text-white font-semibold text-[16px] w-full xl:hover:bg-transparent xl:hover:text-main transition-all duration-300">
          {content.save}
        </button>
      </div>
    </div>
  );
}