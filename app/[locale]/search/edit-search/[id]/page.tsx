"use client";
// next
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

// components
import SignUpLocation from "@/components/SignUpLocation";
import SignUpRequirements from "@/components/SignUpRequirements";
import SignUpDetails from "@/components/SignUpDetails";
import LoadingAnimation from "@/components/LoadingAnimation";
import Popup from "@/components/Popup";
import SuccessAnimation from "@/components/SuccessAnimation";

// Translation service
import { useSearchData } from "@/services/translationService";

// Redux
import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks";
import { selectSearchJobs, updateSearchJob } from "@/store/features/searchJobsSlice";

// context
import { useUserPreferences } from "@/context/userPreferencesContext";
import { usePopup } from "@/context/popupContext";

// API Service
import { updateSearchPreferences } from "@/utils/searchPreferences";

export default function EditSearch() {
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const searchJobId = params.id as string;
  
  const [originalValues, setOriginalValues] = useState<{
    minPrice: number;
    maxPrice: number;
    selectedCity: string;
    neighborhoodCount: number;
    radius: number;
    address: string;
    maxTravelTime: number;
    transportType: string;
    minBeds: number;
    minFloorArea: number;
    furnished: boolean | null;
    niceToHaveCount: number;
    alsoSearchForCount: number;
    showOnlyPropertiesForCount: number;
  } | null>(null);
  
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  
  const [useFallbackMode, setUseFallbackMode] = useState<boolean>(false);
  const [isAddressValidated, setIsAddressValidated] = useState<boolean>(false);
  const [selectedLocationTab, setSelectedLocationTab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showPopup } = usePopup();
  
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  
  const searchJobs = useAppSelector(selectSearchJobs);
  
  const currentSearchJob = useMemo(() => {
    if (!searchJobId) return null;
    return searchJobs.find(job => job.id === parseInt(searchJobId));
  }, [searchJobId, searchJobs]);
  
  const { token } = useAppSelector((state) => state.auth);
  
  const { data: searchData, status } = useSearchData();

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
    adress_valid: "Please select a valid address from the suggestions",
    loadingTitle:"Loading your preferences...",
    loadingText :"We're retrieving your saved search settings so you can update them.",
    unsavedChangesAlert :"You have unsaved changes. Don't forget to save before leaving.",
    tryAgainButton :"Try again",
    serverErrorMessage:"Changes saved locally, but server update failed. Changes may not persist across devices",
    localSaveMessage :"Changes saved locally, but not synchronized with server. Changes may not persist across devices.",


  };

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
    setAddress,
    setTransportType,
    setMinPrice,
    setMaxPrice,
    setMinBeds,
    setMinFloorArea,
    setSelectedCity,
    setSelectedNeighbourhood,
    setSelectedRadiusValue,
    setMaxTravelTime,
    setFurnished,
    setSelectedNiceToHave,
    setSelectedAlsoSearchFor,
    setSelectedShowOnlyPropertiesFor,
    setSelectedLat,
    setSelectedLng,
  } = useUserPreferences();

 

  useEffect(() => {
    if (!searchJobId) {
      return;
    }
  
    setIsLoading(true);
    
    if (currentSearchJob) {
      
      setMinPrice(currentSearchJob.minPrice || 0);
      setMaxPrice(currentSearchJob.maxPrice || 3000);
      setSelectedCity(currentSearchJob.city || "");
      setSelectedNeighbourhood(currentSearchJob.neighbourhoods || []);
      setSelectedRadiusValue(currentSearchJob.radius || 8);
      setAddress(currentSearchJob.address || "");
      setMaxTravelTime(currentSearchJob.maxTravelTime || 15);
      setTransportType(currentSearchJob.transportType || "DRIVING");
      setMinBeds(currentSearchJob.bedrooms || 0);
      setMinFloorArea(currentSearchJob.surface || 0);
      setFurnished(currentSearchJob.furnished);
      setSelectedNiceToHave(currentSearchJob.niceToHave || []);
      setSelectedAlsoSearchFor(currentSearchJob.alsoSearchFor || []);
      setSelectedShowOnlyPropertiesFor(currentSearchJob.showOnlyPropertiesFor || []);
      
      if (currentSearchJob.point && currentSearchJob.point.length === 2) {
        setSelectedLng(currentSearchJob.point[0]);
        setSelectedLat(currentSearchJob.point[1]);
      }
      
      if (currentSearchJob.address) {
        setIsAddressValidated(true);
      }
      
      if (currentSearchJob.type) {
        if (currentSearchJob.type === "RADIUS") {
          setSelectedLocationTab(1);
        } else if (currentSearchJob.type === "TRAVEL_TIME") {
          setSelectedLocationTab(2);
        } else {
          setSelectedLocationTab(0);
        }
      } 
      else if (currentSearchJob.radius > 0 && (!currentSearchJob.neighbourhoods || currentSearchJob.neighbourhoods.length === 0)) {
        setSelectedLocationTab(1);
      } else if (currentSearchJob.address && currentSearchJob.maxTravelTime && (!currentSearchJob.neighbourhoods || currentSearchJob.neighbourhoods.length === 0)) {
        setSelectedLocationTab(2);
      } else {
        setSelectedLocationTab(0);
      }
      
      setOriginalValues({
        minPrice: currentSearchJob.minPrice || 0,
        maxPrice: currentSearchJob.maxPrice || 3000,
        selectedCity: currentSearchJob.city || "",
        neighborhoodCount: (currentSearchJob.neighbourhoods || []).length,
        radius: currentSearchJob.radius || 8,
        address: currentSearchJob.address || "",
        maxTravelTime: currentSearchJob.maxTravelTime || 15,
        transportType: currentSearchJob.transportType || "DRIVING",
        minBeds: currentSearchJob.bedrooms || 0,
        minFloorArea: currentSearchJob.surface || 0,
        furnished: currentSearchJob.furnished,
        niceToHaveCount: (currentSearchJob.niceToHave || []).length,
        alsoSearchForCount: (currentSearchJob.alsoSearchFor || []).length,
        showOnlyPropertiesForCount: (currentSearchJob.showOnlyPropertiesFor || []).length
      });
      
      // Since we're only using Redux, set this to true
      setUseFallbackMode(true);
    } else {
      console.error("Failed to load data: No data available in Redux");
      setError("Failed to load your search preferences. Please try again later.");
    }
    
    setIsLoading(false);
  }, [searchJobId, currentSearchJob]);

  
  
  useEffect(() => {
    if (!originalValues) return;
    
    const currentValues = {
      minPrice,
      maxPrice,
      selectedCity,
      neighborhoodCount: selectedNeighbourhood?.length || 0,
      radius: selectedRadiusValue,
      address,
      maxTravelTime,
      transportType,
      minBeds,
      minFloorArea,
      furnished,
      niceToHaveCount: selectedNiceToHave?.length || 0,
      alsoSearchForCount: selectedAlsoSearchFor?.length || 0,
      showOnlyPropertiesForCount: selectedShowOnlyPropertiesFor?.length || 0
    };
    
    const changed = 
      originalValues.minPrice !== currentValues.minPrice ||
      originalValues.maxPrice !== currentValues.maxPrice ||
      originalValues.selectedCity !== currentValues.selectedCity ||
      originalValues.neighborhoodCount !== currentValues.neighborhoodCount ||
      originalValues.radius !== currentValues.radius ||
      originalValues.address !== currentValues.address ||
      originalValues.maxTravelTime !== currentValues.maxTravelTime ||
      originalValues.transportType !== currentValues.transportType ||
      originalValues.minBeds !== currentValues.minBeds ||
      originalValues.minFloorArea !== currentValues.minFloorArea ||
      originalValues.furnished !== currentValues.furnished ||
      originalValues.niceToHaveCount !== currentValues.niceToHaveCount ||
      originalValues.alsoSearchForCount !== currentValues.alsoSearchForCount ||
      originalValues.showOnlyPropertiesForCount !== currentValues.showOnlyPropertiesForCount;
    
    setHasChanges(changed);
    
  }, [
    originalValues,
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
  ]);

  useEffect(() => {
    if (!selectedCity || selectedCity === "Select a city") {
      setError(content.county_eror);
    } else {
      setError(null);
    }
  }, [selectedCity, content.county_eror]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!searchJobId) {
      setError("Missing search job ID");
      return;
    }

    if (!selectedCity || selectedCity === "Select a city") {
      setError(content.county_eror);
      return;
    }

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

    setIsLoading(true);
    setError(null);

    try {
      const searchType = 
        selectedLocationTab === 0 ? "NEIGHBOURHOODS" as const : 
        selectedLocationTab === 1 ? "RADIUS" as const : "TRAVEL_TIME" as const;
      
  
      dispatch(updateSearchJob({
        id: parseInt(searchJobId),
        type: searchType, 
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
      }));

      // Then update on the server if we're not in fallback mode
      if (!useFallbackMode && token) {
        // console.log("Attempting to update on server...");
        const updateData = {
          type: searchType, 
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
        };

        try {
          console.time("API update time");
          const result = await updateSearchPreferences(parseInt(searchJobId), updateData, token);
          console.timeEnd("API update time");
        } catch (apiError: any) {
          console.error("API update failed, but local update succeeded:", apiError);
          
          if (apiError.response) {
            console.error("Error response:", {
              status: apiError.response.status,
              data: apiError.response.data
            });
          }
          
          setError(`${content.serverErrorMessage}`);
        }
      } else {
        setError(`${content.localSaveMessage}`);
      }
      
      showPopup();
      
      const redirectTimer = setTimeout(() => {
        setIsLoading(false);
        router.push(`/${locale}/dashboard`);
      }, 2000);
      
      return () => clearTimeout(redirectTimer);
    } catch (err: any) {
      setIsLoading(false);
      
      let errorMessage = "Failed to update search preferences";
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      console.error("Error updating search:", errorMessage, err);
      console.error("Full error object:", err);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (!searchJobId && router) {
      router.push(`/${locale}/dashboard`);
    }
  }, [searchJobId, router, locale]);


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FFF7F5]">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center max-w-md">
          <LoadingAnimation />
          <h2 className="mt-4 text-xl font-semibold text-[#003956]">{content.loadingTitle}</h2>
          <p className="mt-2 text-gray-600 text-center">
            {content.loadingText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-[120px] px-2 bg-[#FFF7F5]">
      {isLoading && <LoadingAnimation />}
  
      {/* ─────────── Header copy ─────────── */}
      <div className="flex flex-col items-center justify-center gap-4 text-center lg:text-left lg:items-start relative to-zinc-100">
        <h5 className="text-[16px] leading-[24px] text-main">{content.title}</h5>
        <h1 className="flex flex-col sm:flex-row items-center gap-4 font-extrabold text-3xl xs:text-4xl md:text-5xl md:leading-[60px] text-[#003956]">
          {content.edit_subtitle}
        </h1>
        <p className="text-[16px] leading-[24px] max-w-[730px]">{content.text}</p>
      </div>
  
      {/* ─────────── White card ─────────── */}
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg w-full sm:w-[630px] md:w-[730px] shadow relative">
        {hasChanges && (
          <div className="absolute top-0 left-0 right-0 bg-blue-50 text-blue-700 py-2 px-4 text-center text-sm font-medium rounded-t-lg">
            {content.unsavedChangesAlert}
          </div>
        )}
  
        <SignUpLocation
          isAddressValidated={isAddressValidated}
          setIsAddressValidated={setIsAddressValidated}
          onTabChange={(i) => setSelectedLocationTab(i)}
          selectedTab={selectedLocationTab}
        />
  
        <SignUpRequirements />
        <SignUpDetails />
  
        {/* ─────────── Error box ─────────── */}
        {error && (
          <div
            className={`${
              error.includes("locally")
                ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                : "bg-red-50 border-red-200 text-red-600"
            } text-center px-4 py-3 rounded-lg border mb-2`}
          >
            <div className="flex items-center justify-center">
              {error.includes("locally") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <span>{error}</span>
            </div>
  
            {error.includes("Failed to load") && (
              <div className="mt-2">
                <button
                  onClick={() => router.refresh()}
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  {content.tryAgainButton}
                </button>
              </div>
            )}
          </div>
        )}
  
        {/* ─────────── Save button ─────────── */}
        <div className="flex flex-col w-full gap-2">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-main border border-main py-2 px-8 rounded-lg text-white font-semibold text-[16px] w-full xl:hover:bg-transparent xl:hover:text-main transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? content.saving : content.save}
          </button>
        </div>
      </div>
  
      {/* ─────────── Success popup ─────────── */}
      <Popup>
        <SuccessAnimation />
      </Popup>
    </div>
  );
  
}