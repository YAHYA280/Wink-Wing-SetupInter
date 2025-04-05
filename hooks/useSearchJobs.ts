import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  addSearchJob,
  deleteSearchJob,
  editSearchJob,
  selectSearchJobs,
  selectIsLoading,
  selectError,
} from "@/store/features/searchJobsSlice";
import { SearchJob, Neighbourhood } from "@/types/types";

export const useSearchJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(selectSearchJobs);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const handleAddSearchJob = (
    minPrice: number,
    maxPrice: number,
    selectedCity: string,
    neighbourhoods: Neighbourhood[],
    radius: number,
    address: string,
    maxTravelTime: number,
    transportType: string,
    bedrooms: number,
    surface: number,
    furnished: boolean | null,
    niceToHave: string[],
    alsoSearchFor: string[],
    showOnlyPropertiesFor: string[]
  ) => {
    dispatch(
      addSearchJob({
        minPrice,
        maxPrice,
        selectedCity,
        neighbourhoods,
        radius,
        address,
        maxTravelTime,
        transportType,
        bedrooms,
        surface,
        furnished,
        niceToHave,
        alsoSearchFor,
        showOnlyPropertiesFor,
      })
    );
  };

  const handleDeleteSearchJob = (id: number) => {
    dispatch(deleteSearchJob(id));
  };

  const handleEditSearchJob = (id: number, data: Partial<SearchJob>) => {
    dispatch(editSearchJob({ id, data }));
  };

  return {
    jobs,
    isLoading,
    error,
    handleAddSearchJob,
    handleDeleteSearchJob,
    handleEditSearchJob,
  };
};
