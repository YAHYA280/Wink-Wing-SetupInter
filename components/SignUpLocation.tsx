"use client";
// next
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// react-tabs
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

// context
import { useStepForm } from "@/context/stepFormContext";
import { useUserPreferences } from "@/context/userPreferencesContext";

// types
import { Radius } from "@/types/types";

// react-map-gl
const Map = dynamic(() => import("react-map-gl"), { ssr: false });
import "mapbox-gl/dist/mapbox-gl.css";

// data
import {
  maxTravelTimeOptions,
  transportTypeOptions,
} from "@/data/signupOptions";

// components
import CityDropdown from "./CityDropdown";
import NeighbourhoodDropdown from "./NeighbourhoodDropdown";
import CountryDropdown from "./CountryDropdown";

// Define types for MapBox geocoding API response
interface GeocodingFeature {
  id: string;
  place_name: string;
  center: [number, number]; // [longitude, latitude]
}

// ADD these props so the parent (search.tsx) can know the tab index:
interface SignUpLocationProps {
  isAddressValidated?: boolean;
  setIsAddressValidated?: (value: boolean) => void;
  onTabChange?: (index: number) => void; // ADDED
  selectedTab?: number; // ADDED
}

export default function SignUpLocation({
  isAddressValidated,
  setIsAddressValidated,
  onTabChange, // ADDED
  selectedTab, // ADDED
}: SignUpLocationProps) {
  const {
    radius,
    isRadiusActive,
    setIsRadiusActive,
    selectedRadius,
    setSelectedRadius,
    viewport,
    setViewport,
    mapRef,
    setSelectedRadiusValue,
    setMaxTravelTime,
    setTransportType,
    address,
    setAddress,
    setSelectedLat,
    setSelectedLng,
  } = useUserPreferences();

  const { next } = useStepForm();

  // Use local state if props not provided
  const [internalIsAddressValidated, setInternalIsAddressValidated] =
    useState(false);

  // Use either prop or internal state
  const addressValidated =
    isAddressValidated !== undefined
      ? isAddressValidated
      : internalIsAddressValidated;
  const setAddressValidated =
    setIsAddressValidated || setInternalIsAddressValidated;

  // Track which tab is currently selected
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // CHANGED: we will rely on a single function to handle changes
  const [addressError, setAddressError] = useState<string>("");

  // For address suggestions
  const [addressSuggestions, setAddressSuggestions] = useState<
    GeocodingFeature[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // We'll track if user has explicitly chosen from suggestions:
  const [hasUserChosenSuggestion, setHasUserChosenSuggestion] =
    useState<boolean>(false);

  const addressInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  // -----------------------------
  // Fetch address suggestions
  // -----------------------------
  const fetchAddressSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        }&types=address`
      );
      const data = await response.json();
      setAddressSuggestions(data.features || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  // -----------------------------
  // When user selects a suggestion
  // -----------------------------
  const handleAddressSelect = (suggestion: GeocodingFeature) => {
    // Set the address text
    setAddress(suggestion.place_name);

    // Mark as validated
    setAddressValidated(true);

    // We know user picked from suggestions
    setHasUserChosenSuggestion(true);

    // Clear any errors
    setAddressError("");

    // Hide suggestions dropdown
    setShowSuggestions(false);

    // Update map position
    const [lng, lat] = suggestion.center;
    setSelectedLng(lng);
    setSelectedLat(lat);

    // Fly to location
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 14,
        speed: 1.2, // Smoother animation
        curve: 1.5, // Slightly more pronounced curve
      });
    }
  };

  // -----------------------------
  // Handle user typing in address
  // -----------------------------
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value;
    setAddress(typedValue);

    // If user is typing, reset validation
    setAddressValidated(false);
    setHasUserChosenSuggestion(false);

    // Clear error if they are typing to fix
    if (addressError) setAddressError("");

    // Start fetching suggestions if user typed enough
    if (typedValue.length >= 3) {
      fetchAddressSuggestions(typedValue);
    } else {
      setAddressSuggestions([]);
    }
  };

  // -----------------------------
  // Handler for "Next" button
  // (used if we are in the sign-up wizard)
  // -----------------------------
  const handleNext = () => {
    // We only handle address logic on Travel Time tab:
    if (selectedIndex === 2) {
      if (!address.trim()) {
        setAddressError("Please enter an address");
        addressInputRef.current?.focus();
        return;
      }
      if (!addressValidated) {
        setAddressError("Please select an address from the suggestions");
        addressInputRef.current?.focus();
        return;
      }
    }

    // If all is good, move to next step
    next();
  };

  // -----------------------------
  // If user clicks outside suggestions, close them
  // -----------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        addressInputRef.current &&
        !addressInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // -----------------------------
  // Whenever the `Tabs` index changes, notify parent (search.tsx)
  // -----------------------------
  const handleSelectTab = (index: number) => {
    setSelectedIndex(index);
    onTabChange?.(index); // Let the parent know which tab is active
  };

  return (
    <div>
      <h3 className="font-bold text-lg">Select location based on</h3>
      <Tabs
        // If the parent gave us a selectedTab, we prioritize that, else use local.
        selectedIndex={selectedTab ?? selectedIndex}
        onSelect={handleSelectTab}
      >
        {/* Tab headers */}
        <TabList className="flex flex-col sm:flex-row items-center justify-between bg-[#FFFBF6] p-2 rounded-[8px]">
          <Tab
            selectedClassName="bg-white shadow rounded-lg text-main"
            className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
          >
            <span>
              <svg
                height="13"
                viewBox="0 0 10 13"
                width="10"
                fill={selectedIndex === 0 ? "#FF4907" : "#575757"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.37134 12.0156C0.949463 7.09375 0.340088 6.57812 0.340088 4.75C0.340088 2.26562 2.33228 0.25 4.84009 0.25C7.32446 0.25 9.34009 2.26562 9.34009 4.75C9.34009 6.57812 8.70728 7.09375 5.2854 12.0156C5.07446 12.3438 4.58228 12.3438 4.37134 12.0156ZM4.84009 6.625C5.87134 6.625 6.71509 5.80469 6.71509 4.75C6.71509 3.71875 5.87134 2.875 4.84009 2.875C3.7854 2.875 2.96509 3.71875 2.96509 4.75C2.96509 5.80469 3.7854 6.625 4.84009 6.625Z" />
              </svg>
            </span>
            Neighbourhoods
          </Tab>
          <Tab
            selectedClassName="bg-white shadow rounded-lg text-main"
            className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
          >
            <span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill={selectedIndex === 1 ? "#FF4907" : "#575757"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.26001 1.1875C7.26001 0.8125 7.58813 0.53125 7.9397 0.625C10.4475 1.28125 12.3225 3.55469 12.3225 6.25C12.3225 9.46094 9.72095 12.0625 6.51001 12.0625C3.29907 12.0859 0.69751 9.50781 0.69751 6.29688C0.674072 3.57812 2.52563 1.28125 5.03345 0.625C5.40845 0.53125 5.76001 0.8125 5.76001 1.1875V1.5625C5.76001 1.82031 5.57251 2.03125 5.33813 2.10156C3.51001 2.61719 2.19751 4.28125 2.19751 6.25C2.19751 8.64062 4.11938 10.5625 6.51001 10.5625C8.8772 10.5625 10.8225 8.64062 10.8225 6.25C10.8225 4.28125 9.48657 2.61719 7.65845 2.10156C7.42407 2.03125 7.26001 1.82031 7.26001 1.5625V1.1875Z" />
              </svg>
            </span>
            Radius
          </Tab>
          <Tab
            selectedClassName="bg-white shadow rounded-lg text-main"
            className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
          >
            <span>
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.17493 0.4375C9.38586 0.4375 11.9874 3.03906 11.9874 6.25C11.9874 9.46094 9.38586 12.0625 6.17493 12.0625C2.96399 12.0625 0.362427 9.46094 0.362427 6.25C0.362427 3.03906 2.96399 0.4375 6.17493 0.4375ZM8.33118 7.77344C8.37805 7.72656 8.42493 7.63281 8.42493 7.53906C8.42493 7.42188 8.35461 7.32812 8.2843 7.25781L6.92493 6.25V2.875C6.92493 2.6875 6.73743 2.5 6.54993 2.5H5.79993C5.58899 2.5 5.42493 2.6875 5.42493 2.875V6.53125C5.42493 6.83594 5.54211 7.09375 5.77649 7.25781L7.3468 8.42969C7.39368 8.47656 7.48743 8.52344 7.55774 8.52344C7.69836 8.52344 7.79211 8.45312 7.86243 8.35938L8.33118 7.77344Z"
                  fill={selectedIndex === 2 ? "#FF4907" : "#575757"}
                />
              </svg>
            </span>
            Travel Time
          </Tab>
        </TabList>

        {/* =========================
            1) Neighbourhoods
        ========================== */}
        <TabPanel>
          <div className="flex flex-col md:flex-row items-center justify-center gap-9">
            <div className="flex flex-col items-center justify-center gap-4 mt-5">
              <CountryDropdown />
              <CityDropdown />
              <NeighbourhoodDropdown />
              <div className="border border-[#0A806C] bg-[#0A806C1A] py-2 px-8 rounded-[5px] w-[300px]">
                <span className="text-[#19191A] block text-center">
                  👉 Add up to 4 searches after signing up.
                </span>
              </div>
            </div>
            <div className="w-full h-full">
              <Map
                ref={mapRef}
                {...viewport}
                onMove={(viewport) => setViewport(viewport.viewState)}
                style={{
                  width: "100%",
                  height: "200px",
                  cursor: "grab",
                  borderRadius: "8px",
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              />
            </div>
          </div>
          {pathname === "/signup" && (
            <button
              onClick={next}
              className="block mx-auto bg-main rounded-lg py-3 w-full md:w-max md:px-32 md:mr-0 text-white font-bold text-[16px] border border-main leading-[24px] mt-4 xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
            >
              Start your search
            </button>
          )}
        </TabPanel>

        {/* =========================
            2) Radius
        ========================== */}
        <TabPanel>
          <div className="flex flex-col md:flex-row items-center justify-center gap-9">
            <div className="flex flex-col items-center justify-center gap-4 mt-5">
              <CountryDropdown />
              <CityDropdown />

              {/* radius dropdown */}
              <div className="flex flex-col gap-1 items-start">
                <h3 className="font-semibold text-lg text-[#615D5D]">Radius</h3>
                <div className="relative z-20">
                  <div
                    onClick={(e) => {
                      setIsRadiusActive(!isRadiusActive);
                      e.stopPropagation();
                    }}
                    className={`flex items-center justify-between cursor-pointer bg-[#efefef] xl:hover:bg-[#c1bfbf] transition-all duration-300 rounded-lg py-3 px-4 w-[320px]`}
                  >
                    <h1 className="font-medium text-lg text-[#808080]">
                      {selectedRadius}
                    </h1>
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
                          d="M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.2748 3.62921 12.4527 3.64535C12.6306 3.66156 12.7979 3.73693 12.9278 3.85948C13.0577 3.98202 13.1427 4.14462 13.1692 4.32122C13.1957 4.49782 13.1621 4.6782 13.0738 4.83344L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  {isRadiusActive && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-[110%] w-[320px] z-20 border bg-white shadow-xl rounded-lg"
                    >
                      <div className="p-4">
                        <div className="flex flex-col justify-start items-start">
                          <h3 className="font-semibold text-[#808080] text-[13px]">
                            Radius
                          </h3>
                          <div className="flex flex-col items-start w-full">
                            {radius.length ? (
                              <div className="flex flex-col items-start justify-start max-h-96 overflow-y-scroll w-full">
                                {radius.map((r: Radius) => (
                                  <button
                                    className="font-medium text-lg text-left xl:hover:bg-[#f5f5f5] w-full p-1 rounded-lg"
                                    onClick={() => {
                                      setIsRadiusActive(false);
                                      setSelectedRadius(`+ ${r.label} km`);
                                      setSelectedRadiusValue(r.value);
                                    }}
                                    key={r.id}
                                  >
                                    + {r.label} km
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <h3 className="flex items-center justify-center text-lg font-semibold text-[#484848]">
                                Radius Not Found
                              </h3>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* radius dropdown end */}

              <div className="border border-[#0A806C] bg-[#0A806C1A] py-2 px-8 rounded-[5px] w-[300px]">
                <span className="text-[#19191A] block text-center">
                  👉 Add up to 4 searches after signing up.
                </span>
              </div>
            </div>
            {/* map */}
            <div className="w-full h-full">
              <Map
                ref={mapRef}
                {...viewport}
                onMove={(viewport) => setViewport(viewport.viewState)}
                style={{
                  width: "100%",
                  height: "200px",
                  cursor: "grab",
                  borderRadius: "8px",
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              ></Map>
            </div>
            {/* map end */}
          </div>
          {pathname === "/signup" && (
            <button
              onClick={next}
              className="block mx-auto bg-main rounded-lg py-3 w-full md:w-max md:px-32 md:mr-0 text-white font-bold text-[16px] border border-main leading-[24px] mt-4 xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
            >
              Start your search
            </button>
          )}
        </TabPanel>

        {/* =========================
            3) Travel Time
        ========================== */}
        <TabPanel>
          <div className="flex flex-col md:flex-row items-center justify-center gap-9">
            <div className="flex flex-col items-center justify-center gap-4 mt-5">
              <div>
                <h3 className="font-semibold text-lg text-[#615D5D]">
                  I need to live near
                </h3>
                <div className="relative">
                  <input
                    ref={addressInputRef}
                    className={`
                      flex items-center justify-between bg-transparent
                      border ${
                        addressError ? "border-red-500" : "border-[#CED4D9]"
                      }
                      rounded-lg py-2 px-4 w-[320px]
                    `}
                    type="text"
                    value={address}
                    onChange={handleAddressChange} // CHANGED
                    onClick={(e) => {
                      e.stopPropagation();
                      if (address.length >= 3) {
                        setShowSuggestions(true);
                      }
                    }}
                    placeholder="Select an address from the suggestions"
                  />
                  {addressError && (
                    <p className="text-red-500 text-sm mt-1">{addressError}</p>
                  )}

                  {/* Address suggestions dropdown */}
                  {showSuggestions && addressSuggestions.length > 0 && (
                    <div
                      ref={suggestionsRef}
                      className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                    >
                      {addressSuggestions.map((suggestion) => (
                        <div
                          key={suggestion.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleAddressSelect(suggestion)}
                        >
                          {suggestion.place_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex flex-col w-full">
                  <label className="font-bold text-[16px] leading-[24px]">
                    Max travel time
                  </label>
                  <select
                    className="border border-[#CED4D9] rounded-lg py-2 px-3"
                    onChange={(e) => setMaxTravelTime(Number(e.target.value))}
                  >
                    {maxTravelTimeOptions.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-bold text-[16px] leading-[24px]">
                    Transport type
                  </label>
                  <select
                    onChange={(e) => setTransportType(e.target.value)}
                    className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
                  >
                    {transportTypeOptions.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border border-[#0A806C] bg-[#0A806C1A] py-2 px-8 rounded-[5px] w-[300px]">
                <span className="text-[#19191A] block text-center">
                  👉 Add up to 4 searches after signing up.
                </span>
              </div>
            </div>
            {/* Map */}
            <div className="w-full h-full">
              <Map
                ref={mapRef}
                {...viewport}
                onMove={(viewport) => setViewport(viewport.viewState)}
                style={{
                  width: "100%",
                  height: "200px",
                  cursor: "grab",
                  borderRadius: "8px",
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              />
            </div>
          </div>

          {pathname === "/signup" && (
            <button
              onClick={handleNext}
              className="block mx-auto rounded-lg py-3 w-full md:w-max md:px-32 md:mr-0 text-white font-bold text-[16px] border border-main leading-[24px] mt-4 bg-main xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
            >
              Start your search
            </button>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
}
