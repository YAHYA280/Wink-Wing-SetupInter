"use client";
// context
import { useUserPreferences } from "@/context/userPreferencesContext";

// data
import {
  minPriceOptions,
  maxPriceOptions,
  minBedsOptions,
} from "@/data/signupOptions";

export default function SignUpRequirements() {
  const { setMinPrice, setMaxPrice, setMinBeds, setMinFloorArea } =
    useUserPreferences();

  return (
    <div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-7">
          <div className="flex flex-col">
            <label className="font-bold text-[16px] leading-[24px]">
              Minimum rental price
            </label>
            <select
              onChange={(e) => setMinPrice(Number(e.target.value))}
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
              Maximum rental price
            </label>
            <select
              onChange={(e) => setMaxPrice(Number(e.target.value))}
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
              Bedrooms
            </label>
            <select
              onChange={(e) => setMinBeds(Number(e.target.value))}
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
              Surface
            </label>
            <select
              onChange={(e) => setMinFloorArea(Number(e.target.value))}
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
