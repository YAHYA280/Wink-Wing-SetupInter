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
import { updateSearchPreferences, getSearchJobById } from "@/utils/searchPreferences";

export default function EditSearch() {
  // Log important debugging information
  console.log("EditSearch component initializing");
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const searchJobId = params.id as string;
  
  // State to track original values for change detection
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
  
  // Track if form values have changed
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  
  const [useFallbackMode, setUseFallbackMode] = useState<boolean>(false);
  const [isAddressValidated, setIsAddressValidated] = useState<boolean>(false);
  const [selectedLocationTab, setSelectedLocationTab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showPopup } = usePopup();
  
  // Get the current locale from the URL
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  
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

  // Function to fetch search job data from API - now enhanced with debug information
  const fetchSearchJobData = async () => {
    if (!searchJobId || !token) {
      console.log("Missing required data:", { searchJobId, hasToken: !!token });
      return;
    }
    
    console.log(`Fetching search job data for ID: ${searchJobId}`);
    setIsLoading(true);
    
    try {
      console.time("API fetch time");
      const jobData = await getSearchJobById(parseInt(searchJobId), token);
      console.timeEnd("API fetch time");
      
      console.log("API response:", JSON.stringify(jobData, null, 2));
      
      // Debug which fields are present
      const fields = {
        minPrice: !!jobData.minPrice,
        maxPrice: !!jobData.maxPrice,
        city: !!jobData.city,
        neighbourhoods: Array.isArray(jobData.neighbourhoods) && jobData.neighbourhoods.length > 0,
        radius: !!jobData.radius,
        address: !!jobData.address,
        maxTravelTime: !!jobData.maxTravelTime,
        transportType: !!jobData.transportType,
        minBeds: !!(jobData.minBeds || jobData.bedrooms),
        minFloorArea: !!(jobData.minFloorArea || jobData.surface),
        furnished: jobData.furnished !== undefined,
        niceToHave: Array.isArray(jobData.niceToHave) && jobData.niceToHave.length > 0,
        alsoSearchFor: Array.isArray(jobData.alsoSearchFor) && jobData.alsoSearchFor.length > 0,
        showOnlyPropertiesFor: Array.isArray(jobData.showOnlyPropertiesFor) && jobData.showOnlyPropertiesFor.length > 0,
        point: Array.isArray(jobData.point) && jobData.point.length === 2,
        type: !!jobData.type
      };
      
      console.log("Available fields:", fields);
      
      // Set data to the context with appropriate defaults
      setMinPrice(jobData.minPrice || 0);
      setMaxPrice(jobData.maxPrice || 3000);
      setSelectedCity(jobData.city || "");
      setSelectedNeighbourhood(jobData.neighbourhoods || []);
      setSelectedRadiusValue(jobData.radius || 8);
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
        console.log(`Setting coordinates: [${jobData.point[0]}, ${jobData.point[1]}]`);
        setSelectedLng(jobData.point[0]);
        setSelectedLat(jobData.point[1]);
      }
      
      // If address is present, mark it as validated
      if (jobData.address) {
        console.log(`Address found: "${jobData.address}", marking as validated`);
        setIsAddressValidated(true);
      }
      
      // Set the correct tab based on search type
      if (jobData.type) {
        let tabIndex = 0;
        if (jobData.type === "RADIUS") {
          tabIndex = 1;
        } else if (jobData.type === "TRAVEL_TIME") {
          tabIndex = 2;
        }
        console.log(`Setting tab index to ${tabIndex} based on type: ${jobData.type}`);
        setSelectedLocationTab(tabIndex);
      }
      
      console.log("API data successfully loaded and applied");
      setUseFallbackMode(false);
      
    } catch (err: any) {
      console.error("Error fetching search job data:", err);
      
      // More detailed error logging
      if (err.response) {
        console.error("Error response:", {
          status: err.response.status,
          data: err.response.data
        });
      }
      
      setError("Failed to load search job data from server. Using locally saved data instead.");
      setUseFallbackMode(true);
      throw err; // Re-throw to allow fallback in useEffect
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize form with the search job data (first try API, then fallback to Redux)
  useEffect(() => {
    if (!searchJobId) {
      console.log("No search job ID provided");
      return;
    }

    // Set loading immediately as we begin fetch attempts
    setIsLoading(true);
    console.log(`Attempting to load data for search job ID: ${searchJobId}`);
    
    const loadPreferencesData = async () => {
      try {
        // First attempt: Try getting data from API if we have a token
        if (token) {
          console.log("Token available, trying to fetch from API...");
          const jobData = await getSearchJobById(parseInt(searchJobId), token);
          console.log("Successfully fetched data from API:", jobData);
          
          // Set data to the context
          setMinPrice(jobData.minPrice || 0);
          setMaxPrice(jobData.maxPrice || 3000);
          setSelectedCity(jobData.city || "");
          setSelectedNeighbourhood(jobData.neighbourhoods || []);
          setSelectedRadiusValue(jobData.radius || 8);
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
            console.log("Setting coordinates:", jobData.point);
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
          return; // Exit the function since we loaded successfully
        }
      } catch (err) {
        console.error("Error fetching search job data from API:", err);
        // Continue to fallback - don't return here
      }
      
      // Second attempt: Fallback to Redux data if API failed or no token
      if (currentSearchJob) {
        console.log("Using data from Redux store:", currentSearchJob);
        
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
        
        // If address is present, mark it as validated
        if (currentSearchJob.address) {
          setIsAddressValidated(true);
        }
        
        // Determine tab selection from properties if possible
        if (currentSearchJob.address && currentSearchJob.maxTravelTime) {
          setSelectedLocationTab(2); // Travel time
        } else if (currentSearchJob.radius > 0) {
          setSelectedLocationTab(1); // Radius
        } else {
          setSelectedLocationTab(0); // Neighborhoods
        }
        
        setUseFallbackMode(true);
        setError("Using locally saved data. Some recent changes may not be reflected.");
      } else {
        console.error("Failed to load data: No data available in Redux or API");
        setError("Failed to load your search preferences. Please try again later.");
      }
    };

    loadPreferencesData()
      .finally(() => {
        // Always turn off loading when done
        setIsLoading(false);
        console.log("Data loading complete");
      });
  }, [searchJobId, token, currentSearchJob]);

  // Log important parameters for debugging
  useEffect(() => {
    console.log(`Search job ID: ${searchJobId}`);
    console.log(`Token available: ${!!token}`);
    console.log(`Current search job from Redux:`, currentSearchJob);
  }, [searchJobId, token, currentSearchJob]);
  
  // Effect to detect changes in form values
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
    
    // Check if any value has changed
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
      console.log("Current form state:", {
        id: parseInt(searchJobId),
        minPrice,
        maxPrice,
        selectedCity,
        neighbourhoodCount: selectedNeighbourhood?.length,
        selectedRadiusValue,
        address,
        maxTravelTime,
        transportType,
        minBeds,
        minFloorArea,
        furnished,
        niceToHaveCount: selectedNiceToHave?.length,
        alsoSearchForCount: selectedAlsoSearchFor?.length,
        showOnlyPropertiesForCount: selectedShowOnlyPropertiesFor?.length
      });
        
      // First update in Redux/localStorage
      console.log("Updating in Redux store");
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
        console.log("Attempting to update on server...");
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
          console.time("API update time");
          const result = await updateSearchPreferences(parseInt(searchJobId), updateData, token);
          console.timeEnd("API update time");
          console.log("Server update successful:", result);
        } catch (apiError: any) {
          console.error("API update failed, but local update succeeded:", apiError);
          
          // More detailed error logging
          if (apiError.response) {
            console.error("Error response:", {
              status: apiError.response.status,
              data: apiError.response.data
            });
          }
          
          // Only show a warning, don't prevent saving
          setError("Changes saved locally, but server update failed. Changes may not persist across devices.");
        }
      } else {
        // Show message that we're only saving locally
        console.log("Saving in fallback mode (local only)");
        setError("Changes saved locally, but not synchronized with server. Changes may not persist across devices.");
      }
      
      // Show success popup and redirect
      console.log("Update complete, showing success popup");
      showPopup();
      
      // Set a timer for redirect - give user time to see success message
      const redirectTimer = setTimeout(() => {
        console.log("Redirecting to dashboard");
        setIsLoading(false);
        router.push(`/${locale}/dashboard`);
      }, 2000);
      
      // Cleanup timer if component unmounts
      return () => clearTimeout(redirectTimer);
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
      console.error("Full error object:", err);
      setError(errorMessage);
    }
  };

  // If no search job ID is provided, redirect to dashboard
  useEffect(() => {
    if (!searchJobId && router) {
      router.push(`/${locale}/dashboard`);
    }
  }, [searchJobId, router, locale]);

  // Enhanced loading state with better feedback
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FFF7F5]">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center max-w-md">
          <LoadingAnimation />
          <h2 className="mt-4 text-xl font-semibold text-[#003956]">Loading your preferences...</h2>
          <p className="mt-2 text-gray-600 text-center">
            We're retrieving your saved search settings so you can update them.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-[120px] px-2 bg-[#FFF7F5]">
  {isLoading && <LoadingAnimation />}

  {/* ── Title / subtitle / intro ──────────────────────────── */}
  <div className="flex flex-col items-center justify-center gap-4 text-center lg:text-left lg:items-start relative text-zinc-100">
    <h5 className="text-[16px] leading-[24px] text-main">{content.title}</h5>

    <h1 className="flex flex-col sm:flex-row items-center gap-4 font-extrabold text-3xl xs:text-4xl md:text-5xl md:leading-[60px] text-[#003956]">
      {content.edit_subtitle}
    </h1>

    <p className="text-[16px] leading-[24px] max-w-[730px]">{content.text}</p>
  </div>

  {/* ── Card ─────────────────────────────────────────────── */}
  <div className="flex flex-col gap-4 bg-white p-6 rounded-lg w-full sm:w-[630px] md:w-[730px] shadow relative">
    {hasChanges && (
      <div className="absolute top-0 left-0 right-0 bg-blue-50 text-blue-700 py-2 px-4 text-center text-sm font-medium rounded-t-lg">
        You have unsaved changes. Don&apos;t forget to save before leaving.
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

    {/* ── Error banner ──────────────────────────────────── */}
    {error && (
      <div
        className={`${
          error.includes('locally')
            ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
            : 'bg-red-50 border-red-200 text-red-600'
        } text-center px-4 py-3 rounded-lg border mb-2`}
      >
        <div className="flex items-center justify-center">
          {error.includes('locally') ? (
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

        {error.includes('Failed to load') && (
          <div className="mt-2">
            <button
              onClick={() => router.refresh()}
              className="underline text-blue-600 hover:text-blue-800"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    )}

    {/* ── Save button ───────────────────────────────────── */}
    <div className="flex flex-col w-full gap-2">
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="bg-main border border-main py-2 px-8 rounded-lg text-white font-semibold text-[16px] w-full transition-all duration-300 hover:bg-transparent hover:text-main disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Saving…' : 'Save'}
      </button>
    </div>
  </div>

  {/* ── Success popup ───────────────────────────────────── */}
  <Popup>
    <SuccessAnimation />
  </Popup>
</div>

  );
}