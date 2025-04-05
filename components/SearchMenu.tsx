"use client";
// next
import { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

// react-tabs
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// context
import { useUserPreferences } from "@/context/userPreferencesContext";

// redux
import { useAppSelector } from "@/store/hooks/hooks";

// types
import { Radius } from "@/types/types";

// mapbox
const Map = dynamic(() => import("react-map-gl"), { ssr: false });
import "mapbox-gl/dist/mapbox-gl.css";

// utils
import { getListingsCount } from "@/utils/listings";

// components
import CountryDropdown from "./CountryDropdown";
import CityDropdown from "./CityDropdown";
import NeighbourhoodDropdown from "./NeighbourhoodDropdown";

/**
 * Types for Mapbox geocoding API
 */
interface GeocodingFeature {
  id: string;
  place_name: string;
  center: [number, number];
}

export default function SearchMenu() {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);

  const {
    selectedLat,
    selectedLng,
    selectedNeighbourhood,
    selectedCity,
    viewport,
    setViewport,
    mapRef,
    selectedRadius,
    setSelectedRadius,
    radius,
    setSelectedRadiusValue,
    setIsRadiusActive,
    isRadiusActive,
    type,
    setType,
    matches,
    setMatches,
    setMaxTravelTime,
    setTransportType,
    address,
    setAddress,
    setSelectedLat,
    setSelectedLng,
  } = useUserPreferences();

  // -----------------------------
  // Tab index
  // -----------------------------
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // -----------------------------
  // Error handling
  // -----------------------------
  const [error, setError] = useState<string | null>(null);

  // -----------------------------
  // Travel Time address validation
  // -----------------------------
  const [isAddressValidated, setIsAddressValidated] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<string>("");
  const [hasUserChosenSuggestion, setHasUserChosenSuggestion] =
    useState<boolean>(false);

  // -----------------------------
  // Address suggestions
  // -----------------------------
  const [addressSuggestions, setAddressSuggestions] = useState<
    GeocodingFeature[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // -----------------------------
  // Loading state
  // -----------------------------
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // -----------------------------
  // Options
  // -----------------------------
  const maxTravelTimeOptions = [
    { id: 1, label: "15 minutes", value: 15 },
    { id: 2, label: "30 minutes", value: 30 },
    { id: 3, label: "45 minutes", value: 45 },
    { id: 4, label: "1 hour", value: 60 },
  ];
  const transportTypeOptions = [
    { id: 1, label: "walking", value: "WALKING" },
    { id: 2, label: "cycling", value: "CYCLING" },
    { id: 3, label: "driving", value: "DRIVING" },
    { id: 4, label: "public transport", value: "PUBLIC_TRANSPORT" },
  ];

  // -----------------------------
  // Memoized arrays to avoid re-creating on every render
  // -----------------------------
  const neighbourhoodsID = useMemo(
    () => selectedNeighbourhood.map((n) => ({ id: n.id })),
    [selectedNeighbourhood]
  );

  const radiusValue = useMemo(() => radius.map((r) => r.value), [radius]);

  // ----------------------------------------------------------------------------
  // Only validate city/country if we're NOT in TRAVEL_TIME mode
  // ----------------------------------------------------------------------------
  useEffect(() => {
    if (type !== "TRAVEL_TIME") {
      if (!selectedCity || selectedCity === "Select a city") {
        setError("Please select a city/country first");
      } else {
        setError(null);
      }
    } else {
      // For Travel Time, we do not need a city/country
      setError(null);
    }
  }, [type, selectedCity]);

  // ----------------------------------------------------------------------------
  // Address Suggestions / Geocoding
  // ----------------------------------------------------------------------------
  const fetchAddressSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSelect = (suggestion: GeocodingFeature) => {
    setAddress(suggestion.place_name);
    setIsAddressValidated(true);
    setHasUserChosenSuggestion(true);
    setAddressError("");
    setShowSuggestions(false);

    const [lng, lat] = suggestion.center;
    setSelectedLng(lng);
    setSelectedLat(lat);

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 14,
        speed: 1.2,
        curve: 1.5,
      });
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value;
    setAddress(typedValue);
    setIsAddressValidated(false);
    setHasUserChosenSuggestion(false);

    if (addressError) setAddressError("");

    if (typedValue.length >= 3) {
      fetchAddressSuggestions(typedValue);
    } else {
      setAddressSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // -----------------------------
  // Close suggestions on outside click
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
  // Close radius dropdown on outside click
  // -----------------------------
  useEffect(() => {
    const closeRadiusDropdown = () => setIsRadiusActive(false);
    window.addEventListener("click", closeRadiusDropdown);
    return () => window.removeEventListener("click", closeRadiusDropdown);
  }, [setIsRadiusActive]);

  // ----------------------------------------------------------------------------
  // Fetch listings for Neighborhoods / Radius (skip if TRAVEL_TIME)
  // ----------------------------------------------------------------------------
  useEffect(() => {
    const fetchListingsCount = async () => {
      // If we're in Travel Time, skip city-based fetch
      if (type === "TRAVEL_TIME") {
        return;
      }
      // If city not chosen, skip
      if (!selectedCity || selectedCity === "Select a city") {
        return;
      }

      try {
        setIsLoading(true);
        const body = {
          type,
          neighbourhoods: neighbourhoodsID,
          point: [selectedLng, selectedLat] as [number, number],
          radius: radiusValue.length > 0 ? radiusValue[0] : 300,
          geometry: {
            type: "MultiPolygon",
            coordinates: [
              // Just a sample geometry
              [
                [
                  [4.98051, 52.33078],
                  [4.99786, 52.31398],
                  [5.01613, 52.32451],
                  [5.02154, 52.30246],
                  [5.00789, 52.30152],
                  [4.99748, 52.28912],
                  [4.98351, 52.29037],
                  [4.95524, 52.27831],
                  [4.92933, 52.30853],
                  [4.94049, 52.32568],
                  [4.94766, 52.32814],
                  [4.95268, 52.32264],
                  [4.98051, 52.33078],
                ],
              ],
            ],
          },
        };

        const count = await getListingsCount(body);
        setMatches(count);
      } catch (err) {
        console.error("Error fetching listings count:", err);
        setMatches(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListingsCount();
  }, [
    type,
    neighbourhoodsID,
    selectedLng,
    selectedLat,
    radiusValue,
    selectedCity,
    setMatches,
  ]);

  // ----------------------------------------------------------------------------
  // Validate before starting search
  // ----------------------------------------------------------------------------
  const handleStartSearch = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setError(null);
    setAddressError("");

    // If loading, do nothing
    if (isLoading) {
      e.preventDefault();
      return;
    }

    // For Neighborhoods/Radius, city selection is mandatory
    if (type !== "TRAVEL_TIME") {
      if (!selectedCity || selectedCity === "Select a city") {
        setError("Please select a city/country first");
        e.preventDefault();
        return;
      }
    }

    // For Travel Time tab, validate address
    if (type === "TRAVEL_TIME") {
      if (!address.trim()) {
        setAddressError("Please enter an address");
        addressInputRef.current?.focus();
        e.preventDefault();
        return;
      }
      if (!isAddressValidated) {
        setAddressError("Please select an address from the suggestions");
        addressInputRef.current?.focus();
        e.preventDefault();
        return;
      }
    }
  };

  return (
    <div className="w-full md:w-[770px] h-max bg-[#F8F8F8] rounded-xl px-4 md:px-[35px] py-[30px] mb-10">
      <div className="flex flex-col gap-5">
        <h3 className="font-semibold text-lg text-[#484848]">
          Select location based on
        </h3>

        {/* TABS */}
        <Tabs
          selectedIndex={selectedIndex}
          onSelect={(index) => {
            setSelectedIndex(index);
            setError(null);
            setAddressError("");

            // set search type based on tab
            switch (index) {
              case 0:
                setType("NEIGHBOURHOODS");
                break;
              case 1:
                setType("RADIUS");
                break;
              case 2:
                setType("TRAVEL_TIME");
                break;
            }
          }}
        >
          <TabList className="flex flex-col sm:flex-row items-center justify-between bg-[#EFEFEF] p-2 rounded-[8px]">
            <Tab
              selectedClassName="bg-main shadow rounded-lg text-white h-[50px]"
              className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
            >
              <span>
                <svg
                  height="13"
                  viewBox="0 0 10 13"
                  width="10"
                  fill={selectedIndex === 0 ? "#fff" : "#575757"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.37134 12.0156C0.949463 7.09375 0.340088 6.57812 0.340088 4.75C0.340088 2.26562 2.33228 0.25 4.84009 0.25C7.32446 0.25 9.34009 2.26562 9.34009 4.75C9.34009 6.57812 8.70728 7.09375 5.2854 12.0156C5.07446 12.3438 4.58228 12.3438 4.37134 12.0156ZM4.84009 6.625C5.87134 6.625 6.71509 5.80469 6.71509 4.75C6.71509 3.71875 5.87134 2.875 4.84009 2.875C3.7854 2.875 2.96509 3.71875 2.96509 4.75C2.96509 5.80469 3.7854 6.625 4.84009 6.625Z" />
                </svg>
              </span>
              Neighbourhoods
            </Tab>

            <Tab
              selectedClassName="bg-main shadow rounded-lg text-white h-[50px]"
              className="flex items-center justify-center gap-1 cursor-pointer w-[240px] py-4 outline-none transition-all duration-100"
            >
              <span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill={selectedIndex === 1 ? "#fff" : "#575757"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.26001 1.1875C7.26001 0.8125 7.58813 0.53125 7.9397 0.625C10.4475 1.28125 12.3225 3.55469 12.3225 6.25C12.3225 9.46094 9.72095 12.0625 6.51001 12.0625C3.29907 12.0859 0.69751 9.50781 0.69751 6.29688C0.674072 3.57812 2.52563 1.28125 5.03345 0.625C5.40845 0.53125 5.76001 0.8125 5.76001 1.1875V1.5625C5.76001 1.82031 5.57251 2.03125 5.33813 2.10156C3.51001 2.61719 2.19751 4.28125 2.19751 6.25C2.19751 8.64062 4.11938 10.5625 6.51001 10.5625C8.8772 10.5625 10.8225 8.64062 10.8225 6.25C10.8225 4.28125 9.48657 2.61719 7.65845 2.10156C7.42407 2.03125 7.26001 1.82031 7.26001 1.5625V1.1875Z" />
                </svg>
              </span>
              Radius
            </Tab>

            <Tab
              selectedClassName="bg-main shadow rounded-lg text-white h-[50px]"
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
                    fill={selectedIndex === 2 ? "#fff" : "#575757"}
                  />
                </svg>
              </span>
              Travel Time
            </Tab>
          </TabList>

          {/* NEIGHBOURHOODS TAB */}
          <TabPanel className="mt-6">
            <div className="flex flex-col gap-4">
              {/* Country + City */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <CountryDropdown />
                <CityDropdown />
              </div>

              {/* Neighbourhood */}
              <div className="w-full">
                <NeighbourhoodDropdown />
              </div>

              {/* Map */}
              <div className="w-full h-full">
                <Map
                  ref={mapRef}
                  {...viewport}
                  onMove={(evt) => setViewport(evt.viewState)}
                  style={{
                    width: "100%",
                    height: "300px",
                    cursor: "grab",
                    borderRadius: "8px",
                  }}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                />
              </div>
            </div>
          </TabPanel>

          {/* RADIUS TAB */}
          <TabPanel className="mt-6">
            <div className="flex flex-col gap-4">
              {/* Country + City */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <CountryDropdown />
                <CityDropdown />
              </div>

              {/* Radius */}
              <div className="w-full">
                <div className="flex flex-col gap-1 items-start">
                  <h3 className="font-semibold text-lg text-[#615D5D]">
                    Radius
                  </h3>
                  <div className="relative z-20">
                    <div
                      onClick={(e) => {
                        setIsRadiusActive(!isRadiusActive);
                        e.stopPropagation();
                      }}
                      className="flex items-center justify-between cursor-pointer bg-[#efefef] xl:hover:bg-[#c1bfbf] transition-all duration-300 rounded-lg py-3 px-4 w-[320px]"
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
                        >
                          <path
                            d="M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z"
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
                            <h3 className="font-semibold text-[#808080] text-[13px] mb-2">
                              Radius
                            </h3>
                            <div className="flex flex-col items-start w-full max-h-96 overflow-y-auto">
                              {radius.length ? (
                                radius.map((r: Radius) => (
                                  <button
                                    key={r.id}
                                    className="font-medium text-lg text-left xl:hover:bg-[#f5f5f5] w-full p-1 rounded-lg"
                                    onClick={() => {
                                      setIsRadiusActive(false);
                                      setSelectedRadius(`+ ${r.label} km`);
                                      setSelectedRadiusValue(r.value);
                                    }}
                                  >
                                    + {r.label} km
                                  </button>
                                ))
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
              </div>

              {/* Map */}
              <div className="w-full h-full">
                <Map
                  ref={mapRef}
                  {...viewport}
                  onMove={(evt) => setViewport(evt.viewState)}
                  style={{
                    width: "100%",
                    height: "300px",
                    cursor: "grab",
                    borderRadius: "8px",
                  }}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                />
              </div>
            </div>
          </TabPanel>

          {/* TRAVEL TIME TAB */}
          <TabPanel className="mt-6">
            <div className="flex flex-col gap-4">
              {/* "I need to live near" input only */}
              <div className="flex flex-col items-start w-full">
                <h3 className="font-semibold text-lg text-[#615D5D] mb-1">
                  I need to live near
                </h3>
                <div className="relative w-full">
                  <input
                    ref={addressInputRef}
                    value={address}
                    onChange={handleAddressChange}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (address.length >= 3) {
                        setShowSuggestions(true);
                      }
                    }}
                    type="text"
                    placeholder="Select an address from the suggestions"
                    className={`w-full bg-[#efefef] transition-all duration-300 rounded-lg py-3 px-4 ${
                      addressError ? "border border-red-500" : ""
                    }`}
                  />
                  {addressError && (
                    <p className="text-red-500 text-sm mt-1">{addressError}</p>
                  )}

                  {/* Suggestions */}
                  {showSuggestions && addressSuggestions.length > 0 && (
                    <div
                      ref={suggestionsRef}
                      className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                    >
                      {addressSuggestions.map((sugg) => (
                        <div
                          key={sugg.id}
                          onClick={() => handleAddressSelect(sugg)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {sugg.place_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Max travel time + transport */}
              <div className="flex flex-col md:flex-row gap-4 items-start w-full">
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="font-bold text-[16px] leading-[24px] mb-1">
                    Max travel time
                  </label>
                  <select
                    onChange={(e) => setMaxTravelTime(Number(e.target.value))}
                    className="bg-[#efefef] transition-all duration-300 rounded-lg py-3 px-4 w-full"
                  >
                    {maxTravelTimeOptions.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="font-bold text-[16px] leading-[24px] mb-1">
                    Transport type
                  </label>
                  <select
                    onChange={(e) => setTransportType(e.target.value)}
                    className="bg-[#efefef] transition-all duration-300 rounded-lg py-3 px-4 w-full"
                  >
                    {transportTypeOptions.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-full">
                <Map
                  ref={mapRef}
                  {...viewport}
                  onMove={(evt) => setViewport(evt.viewState)}
                  style={{
                    width: "100%",
                    height: "300px",
                    cursor: "grab",
                    borderRadius: "8px",
                  }}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                />
              </div>
            </div>
          </TabPanel>
        </Tabs>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-center gap-5 mt-8">
          {/* Global error (only if city needed or other issues) */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-center text-red-600 px-4 py-3 rounded-lg w-full">
              {error}
            </div>
          )}

          {/* Show sign-up hint if not logged in */}
          {!token && (
            <div className="border border-[#0A806C] bg-[#0A806C1A] py-2 px-8 rounded-[5px] w-full">
              <span className="text-[#19191A] block text-center">
                👉 Add up to 4 searches after signing up.
              </span>
            </div>
          )}

          <h3 className="font-semibold text-lg">
            With this search you can expect
            <span className="text-main"> {isLoading ? "..." : matches} </span>
            matches per week.
          </h3>

          <Link
            href={token ? "/search" : "/signup"}
            // Prevents navigation if loading
            onClick={(e) => handleStartSearch(e)}
            className={`bg-main text-white border border-main text-[15px] md:text-[20px] py-3 px-24 font-semibold rounded-lg transition-all duration-300 ease-in-out w-max
              ${
                isLoading
                  ? "opacity-75 cursor-not-allowed pointer-events-none"
                  : "xl:hover:bg-transparent xl:hover:text-main"
              }
            `}
            aria-disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Start your search"}
          </Link>
        </div>
      </div>
    </div>
  );
}
