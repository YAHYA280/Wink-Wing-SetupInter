"use client";
// next
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
import { updateSearchPreferences, getSearchJobById } from "@/utils/searchPreferences";

export default function EditSearch() {
  // Log important debugging information
  console.log("EditSearch component initializing");
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [useFallbackMode, setUseFallbackMode] = useState<boolean>(false);
  const [isAddressValidated, setIsAddressValidated] = useState<boolean>(false);
  const [selectedLocationTab, setSelectedLocationTab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showPopup } = usePopup();
  
  // Get the current locale from the URL
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  
  // Get the search job ID from query params
  const searchJobId = searchParams.get("id");
  
  // Get all search jobs from Redux
  const searchJobs = useAppSelector(selectSearchJobs);
  
  // Get the current search job
  const currentSearchJob = useMemo(() => {
    if (!searchJobId) return null;
    return searchJobs.find(job => job.id === parseInt(searchJobId));
  }, [searchJobId, searchJobs]);
  
  // Get user token from Redux
  const { token } = useAppSelector((state) => state.auth);
  
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

  // Function to fetch search job data from API
  const fetchSearchJobData = async () => {
    if (!searchJobId || !token) return;
    
    setIsLoading(true);
    try {
      const jobData = await getSearchJobById(parseInt(searchJobId), token);
      
      // Set data to the context
      setMinPrice(jobData.minPrice);
      setMaxPrice(jobData.maxPrice);
      setSelectedCity(jobData.city || "");
      setSelectedNeighbourhood(jobData.neighbourhoods || []);
      setSelectedRadiusValue(jobData.radius || 0);
      setAddress(jobData.address || "");
      setMaxTravelTime(jobData.maxTravelTime || 15);
      setTransportType(jobData.transportType || "DRIVING");
      setMinBeds(jobData.minBeds || jobData.bedrooms || 0);
      setMinFloorArea(jobData.minFloorArea || jobData.surface || 0);
      setFurnished(jobData.furnished);
      setSelectedNiceToHave(jobData.niceToHave || []);
      setSelectedAlsoSearchFor(jobData.alsoSearchFor || []);
      setSelectedShowOnlyPropertiesFor(jobData.showOnlyPropertiesFor || []);
      
      // Set location coordinates if available
      if (jobData.point && jobData.point.length === 2) {
        setSelectedLng(jobData.point[0]);
        setSelectedLat(jobData.point[1]);
      }
      
      // If address is present, mark it as validated
      if (jobData.address) {
        setIsAddressValidated(true);
      }
      
      // Set the correct tab based on search type
      if (jobData.type) {
        if (jobData.type === "RADIUS") {
          setSelectedLocationTab(1);
        } else if (jobData.type === "TRAVEL_TIME") {
          setSelectedLocationTab(2);
        } else {
          setSelectedLocationTab(0); // NEIGHBOURHOODS
        }
      }
      
      // We successfully loaded from API
      setUseFallbackMode(false);
      
    } catch (err) {
      console.error("Error fetching search job data:", err);
      setError("Failed to load search job data from server. Using locally saved data instead.");
      setUseFallbackMode(true);
      throw err; // Re-throw to allow fallback in useEffect
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize form with the search job data (first try API, then fallback to Redux)
  useEffect(() => {
    if (searchJobId && token) {
      // Try to get data from API
      fetchSearchJobData().catch(err => {
        console.log("Falling back to Redux data after API error");
        
        // Fallback to Redux data if API call fails
        if (currentSearchJob) {
          setMinPrice(currentSearchJob.minPrice);
          setMaxPrice(currentSearchJob.maxPrice);
          setSelectedCity(currentSearchJob.city);
          setSelectedNeighbourhood(currentSearchJob.neighbourhoods || []);
          setSelectedRadiusValue(currentSearchJob.radius);
          setAddress(currentSearchJob.address || "");
          setMaxTravelTime(currentSearchJob.maxTravelTime);
          setTransportType(currentSearchJob.transportType);
          setMinBeds(currentSearchJob.bedrooms);
          setMinFloorArea(currentSearchJob.surface);
          setFurnished(currentSearchJob.furnished);
          setSelectedNiceToHave(currentSearchJob.niceToHave || []);
          setSelectedAlsoSearchFor(currentSearchJob.alsoSearchFor || []);
          setSelectedShowOnlyPropertiesFor(currentSearchJob.showOnlyPropertiesFor || []);
          
          // If address is present, mark it as validated
          if (currentSearchJob.address) {
            setIsAddressValidated(true);
          }
          
          // Show warning that we're using local data
          setError("Using locally saved data. Some recent changes may not be reflected.");
        }
      });
    } else if (currentSearchJob) {
      // No token or search job ID, use Redux data directly
      setMinPrice(currentSearchJob.minPrice);
      setMaxPrice(currentSearchJob.maxPrice);
      setSelectedCity(currentSearchJob.city);
      setSelectedNeighbourhood(currentSearchJob.neighbourhoods || []);
      setSelectedRadiusValue(currentSearchJob.radius);
      setAddress(currentSearchJob.address || "");
      setMaxTravelTime(currentSearchJob.maxTravelTime);
      setTransportType(currentSearchJob.transportType);
      setMinBeds(currentSearchJob.bedrooms);
      setMinFloorArea(currentSearchJob.surface);
      setFurnished(currentSearchJob.furnished);
      setSelectedNiceToHave(currentSearchJob.niceToHave || []);
      setSelectedAlsoSearchFor(currentSearchJob.alsoSearchFor || []);
      setSelectedShowOnlyPropertiesFor(currentSearchJob.showOnlyPropertiesFor || []);
      
      // If address is present, mark it as validated
      if (currentSearchJob.address) {
        setIsAddressValidated(true);
      }
    }
  }, [searchJobId, token, currentSearchJob]);

  // Log important parameters for debugging
  useEffect(() => {
    console.log(`Search job ID: ${searchJobId}`);
    console.log(`Token available: ${!!token}`);
    console.log(`Current search job from Redux:`, currentSearchJob);
  }, [searchJobId, token, currentSearchJob]);

  useEffect(() => {
    // Check the city selection on the client side only
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
    setError(null);

    try {
      // Determine the search type based on selected tab
      const searchType = 
        selectedLocationTab === 0 ? "NEIGHBOURHOODS" : 
        selectedLocationTab === 1 ? "RADIUS" : "TRAVEL_TIME";
      
      console.log("Updating search with type:", searchType);
        
      // First update in Redux/localStorage
      dispatch(updateSearchJob({
        id: parseInt(searchJobId),
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
        const updateData = {
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
          const result = await updateSearchPreferences(parseInt(searchJobId), updateData, token);
          console.log("Update successful:", result);
        } catch (apiError) {
          console.error("API update failed, but local update succeeded:", apiError);
          // Only show a warning, don't prevent saving
          setError("Changes saved locally, but server update failed. Changes may not persist across devices.");
        }
      } else {
        // Show message that we're only saving locally
        console.log("Saving in fallback mode (local only)");
        setError("Changes saved locally, but not synchronized with server. Changes may not persist across devices.");
      }
      
      // Show success popup and redirect
      showPopup();
      
      setTimeout(() => {
        setIsLoading(false);
        router.push(`/${locale}/dashboard`);
      }, 2000);
    } catch (err: any) {
      setIsLoading(false);
      
      // Extract the most useful error message
      let errorMessage = "Failed to update search preferences";
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      console.error("Error updating search:", errorMessage, err);
      setError(errorMessage);
    }
  };

  // If no search job ID is provided, redirect to dashboard
  useEffect(() => {
    if (!searchJobId && router) {
      router.push(`/${locale}/dashboard`);
    }
  }, [searchJobId, router, locale]);

  // If loading initial data, show loading state
  if (isLoading && !currentSearchJob) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-[120px] px-2 bg-[#FFF7F5]">
      {isLoading && <LoadingAnimation />}

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
        <SignUpLocation
          isAddressValidated={isAddressValidated}
          setIsAddressValidated={setIsAddressValidated}
          onTabChange={(i) => setSelectedLocationTab(i)}
          selectedTab={selectedLocationTab}
        />

        <SignUpRequirements />
        <SignUpDetails />

        {error && (
          <div className={`${
            error.includes("locally") ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "bg-red-50 border-red-200 text-red-600"
          } text-center px-4 py-3 rounded-lg border`}>
            {error}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-main border border-main py-2 px-8 rounded-lg text-white font-semibold text-[16px] w-full xl:hover:bg-transparent xl:hover:text-main transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? content.saving : content.save}
        </button>
      </div>

      {/* Popup for success message with animated content */}
      <Popup>
        <SuccessAnimation />
      </Popup>
    </div>
  );
}