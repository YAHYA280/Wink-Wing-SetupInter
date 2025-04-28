import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchJob, Neighbourhood } from "@/types/types";

interface SearchJobsState {
  jobs: SearchJob[];
  isLoading: boolean;
  error: string | null;
}

// Load initial state from localStorage
const loadInitialState = (): SearchJobsState => {
  if (typeof window === "undefined") {
    return { jobs: [], isLoading: false, error: null };
  }

  const savedJobs = localStorage.getItem("searchJobs");
  if (savedJobs) {
    try {
      return {
        jobs: JSON.parse(savedJobs),
        isLoading: false,
        error: null,
      };
    } catch (error) {
      console.error("Error loading search jobs from localStorage:", error);
      return { jobs: [], isLoading: false, error: null };
    }
  }
  return { jobs: [], isLoading: false, error: null };
};

const initialState: SearchJobsState = loadInitialState();

export const searchJobsSlice = createSlice({
  name: "searchJobs",
  initialState,
  reducers: {
    addSearchJob: (
      state,
      action: PayloadAction<{
        minPrice: number;
        maxPrice: number;
        selectedCity: string;
        neighbourhoods: Neighbourhood[];
        radius: number;
        address: string;
        maxTravelTime: number;
        transportType: string;
        bedrooms: number;
        surface: number;
        furnished: boolean | null;
        niceToHave: string[];
        alsoSearchFor: string[];
        showOnlyPropertiesFor: string[];
      }>
    ) => {
      const { payload } = action;
      const newJob = {
        id: Date.now(),
        title: `$${payload.minPrice}-$${payload.maxPrice} in ${payload.selectedCity}`,
        city: payload.selectedCity,
        neighbourhoods: payload.neighbourhoods,
        radius: payload.radius,
        address: payload.address,
        maxTravelTime: payload.maxTravelTime,
        transportType: payload.transportType,
        minPrice: payload.minPrice,
        maxPrice: payload.maxPrice,
        bedrooms: payload.bedrooms,
        surface: payload.surface,
        furnished: payload.furnished,
        niceToHave: payload.niceToHave,
        alsoSearchFor: payload.alsoSearchFor,
        showOnlyPropertiesFor: payload.showOnlyPropertiesFor,
      };
      state.jobs.push(newJob);

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("searchJobs", JSON.stringify(state.jobs));
      }
    },
    deleteSearchJob: (state, action: PayloadAction<number>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("searchJobs", JSON.stringify(state.jobs));
      }
    },
    editSearchJob: (
      state,
      action: PayloadAction<{ id: number; data: Partial<SearchJob> }>
    ) => {
      const { id, data } = action.payload;
      const jobIndex = state.jobs.findIndex((job) => job.id === id);
      
      if (jobIndex !== -1) {
        // Create updated job with new title
        const updatedJob = {
          ...state.jobs[jobIndex],
          ...data,
          // Update title to reflect new price and city if those values changed
          title: data.minPrice !== undefined && data.maxPrice !== undefined && data.city !== undefined 
            ? `$${data.minPrice}-$${data.maxPrice} in ${data.city}`
            : data.minPrice !== undefined && data.maxPrice !== undefined
            ? `$${data.minPrice}-$${data.maxPrice} in ${state.jobs[jobIndex].city}`
            : data.city !== undefined
            ? `$${state.jobs[jobIndex].minPrice}-$${state.jobs[jobIndex].maxPrice} in ${data.city}`
            : state.jobs[jobIndex].title
        };
        
        // Replace the job in the array
        state.jobs[jobIndex] = updatedJob;

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("searchJobs", JSON.stringify(state.jobs));
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateSearchJob: (
      state,
      action: PayloadAction<{
        id: number;
        minPrice: number;
        maxPrice: number;
        selectedCity: string;
        selectedNeighbourhood: Neighbourhood[];
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
      }>
    ) => {
      const { payload } = action;
      const jobIndex = state.jobs.findIndex((job) => job.id === payload.id);
      
      if (jobIndex !== -1) {
        // Create updated job object
        const updatedJob = {
          ...state.jobs[jobIndex],
          title: `$${payload.minPrice}-$${payload.maxPrice} in ${payload.selectedCity}`,
          city: payload.selectedCity,
          neighbourhoods: payload.selectedNeighbourhood,
          radius: payload.selectedRadiusValue,
          address: payload.address,
          maxTravelTime: payload.maxTravelTime,
          transportType: payload.transportType,
          minPrice: payload.minPrice,
          maxPrice: payload.maxPrice,
          bedrooms: payload.minBeds,
          surface: payload.minFloorArea,
          furnished: payload.furnished,
          niceToHave: payload.selectedNiceToHave,
          alsoSearchFor: payload.selectedAlsoSearchFor,
          showOnlyPropertiesFor: payload.selectedShowOnlyPropertiesFor,
        };
        
        // Replace the job in the array
        state.jobs[jobIndex] = updatedJob;

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("searchJobs", JSON.stringify(state.jobs));
        }
      }
    },
  },
});

// Selectors
export const selectSearchJobs = (state: { searchJobs: SearchJobsState }) =>
  state.searchJobs.jobs;
export const selectIsLoading = (state: { searchJobs: SearchJobsState }) =>
  state.searchJobs.isLoading;
export const selectError = (state: { searchJobs: SearchJobsState }) =>
  state.searchJobs.error;

// Actions
export const {
  addSearchJob,
  deleteSearchJob,
  editSearchJob,
  setLoading,
  setError,
  updateSearchJob,
} = searchJobsSlice.actions;

export default searchJobsSlice.reducer;