"use client";
// next
import { useEffect, useState } from "react";

// data
import { countryOptions } from "@/data/signupOptions";

// context
import { useUserPreferences } from "@/context/userPreferencesContext";

type CountryCode = "NL" | "UK";

const countryCoordinates: Record<CountryCode, { lat: number; lng: number }> = {
  NL: { lat: 52.3675734, lng: 4.9041389 }, // Netherlands (Amsterdam)
  UK: { lat: 51.5074, lng: -0.1278 }, // United Kingdom (London)
};

export default function CountryDropdown() {
  // Active status of the dropdown
  const [isCountryActive, setIsCountryActive] = useState(false);

  const {
    country,
    setCountry,
    setSelectedCountryValue,
    setSelectedCity,
    setSelectedLat,
    setSelectedLng,
  } = useUserPreferences();

  useEffect(() => {
    const closeDropdown = () => setIsCountryActive(false);
    window.addEventListener("click", closeDropdown);

    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="flex flex-col gap-1 items-start">
      <h3 className="font-semibold text-lg text-[#615D5D]">Country</h3>
      <div className="relative z-40">
        <div
          onClick={(e) => {
            // Toggle dropdown visibility and stop propagation
            setIsCountryActive(!isCountryActive);
            e.stopPropagation();
          }}
          className="flex items-center justify-between cursor-pointer bg-[#efefef] xl:hover:bg-[#c1bfbf] transition-all duration-300 rounded-lg py-3 px-4 w-[320px]"
        >
          <h1 className="font-medium text-lg text-[#808080]">{country}</h1>
          <span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="p-icon p-multiselect-trigger-icon p-c"
              data-pc-section="triggericon"
            >
              <path
                d="M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        </div>
        {isCountryActive && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[110%] w-[320px] border bg-white shadow-xl rounded-lg"
          >
            <div className="p-4">
              <div className="flex flex-col justify-start items-start">
                <h3 className="font-semibold text-[#808080] text-[13px]">
                  Countries
                </h3>
                <div className="flex flex-col items-start w-full">
                  <div className="flex flex-col items-start justify-start max-h-96 overflow-y-scroll w-full">
                    {countryOptions.map((country) => (
                      <button
                        key={country.id}
                        onClick={() => {
                          setIsCountryActive(false);
                          setSelectedCountryValue(country.value);
                          setCountry(country.label);
                          setSelectedCity("Select a city");

                          // Update map coordinates based on selected country
                          const countryCode = country.value as CountryCode;
                          if (countryCoordinates[countryCode]) {
                            setSelectedLat(countryCoordinates[countryCode].lat);
                            setSelectedLng(countryCoordinates[countryCode].lng);
                          }
                        }}
                        className="font-medium text-lg text-left xl:hover:bg-[#f5f5f5] w-full p-1 rounded-lg"
                      >
                        {country.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
