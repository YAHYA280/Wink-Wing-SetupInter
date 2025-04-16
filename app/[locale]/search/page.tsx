"use client";
// next
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// components
import SignUpLocation from "@/components/SignUpLocation";
import SignUpRequirements from "@/components/SignUpRequirements";
import SignUpDetails from "@/components/SignUpDetails";
import Popup from "@/components/Popup";
import SuccessAnimation from "@/components/SuccessAnimation";

// Translation service
import { useSearchData } from "@/services/translationService";

// Dynamic import of LoadingAnimation with no SSR
const LoadingAnimation = dynamic(
  () => import("@/components/LoadingAnimation"),
  {
    ssr: false,
  }
);

// hooks
import { useSearchJobs } from "@/hooks/useSearchJobs";

// context
import { usePopup } from "@/context/popupContext";
import { useUserPreferences } from "@/context/userPreferencesContext";

export default function Search() {
  const [isAddressValidated, setIsAddressValidated] = useState<boolean>(false);

  // Track which tab is selected in SignUpLocation
  const [selectedLocationTab, setSelectedLocationTab] = useState<number>(0);

  const { handleAddSearchJob } = useSearchJobs();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showPopup } = usePopup();

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

  const {
    selectedCity,
    selectedNeighbourhood,
    selectedRadiusValue,
    minPrice,
    maxPrice,
    address,
    maxTravelTime,
    transportType,
    minBeds,
    minFloorArea,
    furnished,
    selectedNiceToHave,
    selectedAlsoSearchFor,
    selectedShowOnlyPropertiesFor,
  } = useUserPreferences();

  const router = useRouter();

  useEffect(() => {
    // Check the city selection on the client side only
    if (!selectedCity || selectedCity === "Select a city") {
      setError(content.county_eror);
    } else {
      setError(null);
    }
  }, [selectedCity, content.county_eror]);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();

    // First check for city
    if (!selectedCity || selectedCity === "Select a city") {
      setError(content.county_eror);
      return;
    }

    // Only if we are on the Travel Time tab (index = 2), force user to have a valid address
    if (selectedLocationTab === 2) {
      if (!address.trim()) {
        setError(content.adress_eror);
        return;
      }
      if (!isAddressValidated) {
        setError(content.adress_valid);
        return;
      }
    }

    // All validations passed, proceed with saving
    setIsLoading(true);

    handleAddSearchJob(
      minPrice,
      maxPrice,
      selectedCity,
      selectedNeighbourhood,
      selectedRadiusValue,
      address,
      maxTravelTime,
      transportType,
      minBeds,
      minFloorArea,
      furnished,
      selectedNiceToHave,
      selectedAlsoSearchFor,
      selectedShowOnlyPropertiesFor
    );

    // Show popup and redirect after a delay
    showPopup();

    setTimeout(() => {
      setIsLoading(false);
      router.push(`/${locale}/dashboard`);
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-[120px] px-2 bg-[#FFF7F5]">
      {isLoading && <LoadingAnimation />}

      <div className="flex flex-col items-center justify-center gap-4 text-center lg:text-left lg:items-start relative to-zinc-100">
        <h5 className="text-[16px] leading-[24px] text-main">
          {content.title}
        </h5>
        <h1 className="flex flex-col sm:flex-row items-center gap-4 font-extrabold text-3xl xs:text-4xl md:text-5xl md:leading-[60px] text-[#003956]">
          {content.subtitle}
        </h1>
        <p className="text-[16px] leading-[24px] max-w-[730px]">
          {content.text}
        </p>
      </div>

      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg w-full sm:w-[630px] md:w-[730px] shadow">
        <SignUpLocation
          isAddressValidated={isAddressValidated}
          setIsAddressValidated={setIsAddressValidated}
          onTabChange={(i) => setSelectedLocationTab(i)}
          selectedTab={selectedLocationTab}
        />

        <SignUpRequirements />
        <SignUpDetails />

        {error && (
          <div className="bg-red-50 border border-red-200 text-center text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between gap-8">
          <Link
             href={`/${locale}/dashboard`}
            className="bg-transparent border border-main py-2 px-8 text-center rounded-lg text-main font-semibold text-[16px] w-full xl:hover:bg-main xl:hover:text-white transition-all duration-300"
          >
            {content.prv}
          </Link>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-main border border-main py-2 px-8 rounded-lg text-white font-semibold text-[16px] w-full xl:hover:bg-transparent xl:hover:text-main transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? content.saving : content.save}
          </button>
        </div>
      </div>

      {/* Popup for success message with animated content */}
      <Popup>
        <SuccessAnimation />
      </Popup>
    </div>
  );
}