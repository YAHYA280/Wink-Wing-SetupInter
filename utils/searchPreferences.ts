// axios
import axios from "axios";

// Update search preferences
export const updateSearchPreferences = async (
  searchJobId: number,
  data: {
    minPrice: number;
    maxPrice: number;
    selectedCity: string;
    selectedNeighbourhood: any[];
    selectedRadiusValue: number;
    address: string;
    maxTravelTime: number;
    transportType: string;
    minBeds: number;
    minFloorArea: number;
    furnished: boolean | null;
    selectedNiceToHave: string[];
    selectedAlsoSearchFor: string[];
    selectedShowOnlyPropertiesFor: string[];
  },
  token: string
) => {
  try {
    // Get the existing search job to obtain current data we need to preserve
    const existingJobResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search-jobs/${searchJobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    const existingJob = existingJobResponse.data;
    
    // Create the update payload based on existing job data
    const apiData = {
      type: existingJob.type || "NEIGHBOURHOODS",
      country: existingJob.country || "NL",
      cityId: existingJob.cityId,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      minBeds: data.minBeds,
      minFloorArea: data.minFloorArea,
      furnished: data.furnished,
      neighbourhoods: data.selectedNeighbourhood.map(n => ({ id: n.id })),
      maxTravelTime: data.maxTravelTime,
      transportType: data.transportType,
      radius: data.selectedRadiusValue,
      address: data.address,
      niceToHave: data.selectedNiceToHave,
      alsoSearchFor: data.selectedAlsoSearchFor,
      showOnlyPropertiesFor: data.selectedShowOnlyPropertiesFor,
      point: existingJob.point || [0, 0],
      geometry: existingJob.geometry || null,
      userType: existingJob.userType
    };

    // Use PUT method instead of PATCH for search job updates
    // Make sure to use the correct endpoint path for your API
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/search-jobs/${searchJobId}`,
      apiData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );
    
    // console.log("Update response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error updating search preferences:", error);
    console.error("Detailed error:", error.response?.data);
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};

// Get search job by ID
export const getSearchJobById = async (searchJobId: number, token: string) => {
  try {
    // console.log(`Fetching search job with ID: ${searchJobId}`);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/search-jobs/${searchJobId}`;
    // console.log(`API URL: ${url}`);
    
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // console.log("Search job data retrieved successfully:", response.data);
    return response.data;
  } catch (error: any) {
    // Simplified error logging to avoid excessive console errors
    console.error(`Error fetching search job ${searchJobId}:`, 
      error.response ? `Status: ${error.response.status}` : "Network error");
    
    // Log to console but don't show detailed errors to users
    if (process.env.NODE_ENV === 'development') {
      if (error.response) {
        // Request made but server returned an error
        // console.log("Server returned error status:", error.response.status);
      } else if (error.request) {
        // Request made but no response received
        // console.log("No response received from server");
      } else {
        // Error during request setup
        // console.log("Error setting up request:", error.message);
      }
    }
    
    throw new Error("Could not retrieve search job data from server");
  }
};