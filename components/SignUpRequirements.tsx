// components/SignUpRequirements.tsx
"use client";
// context
import { useUserPreferences } from "@/context/userPreferencesContext";
import { useMemo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSignUpData } from "@/services/translationService";



// data
import {
  minPriceOptions,
  maxPriceOptions,
  minBedsOptions,
} from "@/data/signupOptions";

// Default content for fallback
const defaultRequirementsContent = {
  min_rental_price: "Minimum rental price",
  max_rental_price: "Maximum rental price",
  bedrooms: "Bedrooms",
  surface: "Surface",
};

export default function SignUpRequirements() {
  const { 
    minPrice, 
    maxPrice, 
    minBeds, 
    minFloorArea,
    setMinPrice, 
    setMaxPrice, 
    setMinBeds, 
    setMinFloorArea 
  } = useUserPreferences();

  // Local state to track select values
  const [localMinPrice, setLocalMinPrice] = useState<string>("");
  const [localMaxPrice, setLocalMaxPrice] = useState<string>("");
  const [localMinBeds, setLocalMinBeds] = useState<string>("");
  const [localMinFloorArea, setLocalMinFloorArea] = useState<string>("");

  // Get translations
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: signupData, status } = useSignUpData();

  // Merge API data with defaults using useMemo
  const requirementsContent = useMemo(() => {
    if (status === "success" && signupData?.SignupRequirements) {
      return {
        ...defaultRequirementsContent,
        ...signupData.SignupRequirements,
      };
    }
    return defaultRequirementsContent;
  }, [signupData, status]);

  // Sync local state with context values from parent
  useEffect(() => {
    // Only update when values are available and different from current local state
    if (minPrice !== undefined && minPrice.toString() !== localMinPrice) {
      setLocalMinPrice(minPrice.toString());
    }
    if (maxPrice !== undefined && maxPrice.toString() !== localMaxPrice) {
      setLocalMaxPrice(maxPrice.toString());
    }
    if (minBeds !== undefined && minBeds.toString() !== localMinBeds) {
      setLocalMinBeds(minBeds.toString());
    }
    if (minFloorArea !== undefined && minFloorArea.toString() !== localMinFloorArea) {
      setLocalMinFloorArea(minFloorArea.toString());
    }
  }, [minPrice, maxPrice, minBeds, minFloorArea]);

  // Handle changes to min price
  // eslint-disable-next-line no-undef
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocalMinPrice(value);
    setMinPrice(Number(value));
  };

  // Handle changes to max price
  // eslint-disable-next-line no-undef
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocalMaxPrice(value);
    setMaxPrice(Number(value));
  };

  // Handle changes to min beds
  // eslint-disable-next-line no-undef
  const handleMinBedsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocalMinBeds(value);
    setMinBeds(Number(value));
  };

  // Handle changes to min floor area
  // eslint-disable-next-line no-undef
  const handleMinFloorAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocalMinFloorArea(value);
    setMinFloorArea(Number(value));
  };

  return (
    <div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-7">
          <div className="flex flex-col">
            <label className="font-bold text-[16px] leading-[24px]">
              {requirementsContent.min_rental_price}
            </label>
            <select
              value={localMinPrice}
              onChange={handleMinPriceChange}
              className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full md:w-[270px] lg:w-[330px]"
            >
              {minPriceOptions.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-[16px] leading-[24px]">
              {requirementsContent.max_rental_price}
            </label>
            <select
              value={localMaxPrice}
              onChange={handleMaxPriceChange}
              className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full md:w-[270px] lg:w-[330px]"
            >
              {maxPriceOptions.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-7">
          <div className="flex flex-col">
            <label className="font-bold text-[16px] leading-[24px]">
              {requirementsContent.bedrooms}
            </label>
            <select
              value={localMinBeds}
              onChange={handleMinBedsChange}
              className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full md:w-[270px] lg:w-[330px]"
            >
              {minBedsOptions.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-[16px] leading-[24px]">
              {requirementsContent.surface}
            </label>
            <select
              value={localMinFloorArea}
              onChange={handleMinFloorAreaChange}
              className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full md:w-[270px] lg:w-[330px]"
            >
              <option value="0">0+ m&sup2;</option>
              <option value="20">20+ m&sup2;</option>
              <option value="30">30+ m&sup2;</option>
              <option value="40">40+ m&sup2;</option>
              <option value="50">50+ m&sup2;</option>
              <option value="70">70+ m&sup2;</option>
              <option value="90">90+ m&sup2;</option>
              <option value="110">110+ m&sup2;</option>
              <option value="130">130+ m&sup2;</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}