"use client";
// next
import {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";

// types
import { City, Neighbourhood, Radius } from "@/types/types";

// utils
import { getCities, getNeighborhoods } from "@/utils/cities";

// react-map-gl
import { ViewState } from "react-map-gl";

type UserPreferencesContext = {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  matches: number;
  setMatches: React.Dispatch<React.SetStateAction<number>>;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  radius: Radius[];
  setRadius: React.Dispatch<React.SetStateAction<Radius[]>>;
  maxTravelTime: number;
  setMaxTravelTime: React.Dispatch<React.SetStateAction<number>>;
  transportType: string;
  setTransportType: React.Dispatch<React.SetStateAction<string>>;
  minBeds: number;
  setMinBeds: React.Dispatch<React.SetStateAction<number>>;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  minFloorArea: number;
  setMinFloorArea: React.Dispatch<React.SetStateAction<number>>;
  furnished: boolean | null;
  setFurnished: React.Dispatch<React.SetStateAction<boolean | null>>;
  nice_to_have: { id: number; label: string; value: string }[];
  setNiceToHave: React.Dispatch<
    React.SetStateAction<{ id: number; label: string; value: string }[]>
  >;
  also_search_for: { id: number; label: string; value: string }[];
  setAlsoSearchFor: React.Dispatch<
    React.SetStateAction<{ id: number; label: string; value: string }[]>
  >;
  show_only_properties_for: { id: number; label: string; value: string }[];
  setShowOnlyPropertiesFor: React.Dispatch<
    React.SetStateAction<{ id: number; label: string; value: string }[]>
  >;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  point: number[];
  setPoint: React.Dispatch<React.SetStateAction<number[]>>;
  selectedNiceToHave: string[];
  setSelectedNiceToHave: React.Dispatch<React.SetStateAction<string[]>>;
  selectedAlsoSearchFor: string[];
  setSelectedAlsoSearchFor: React.Dispatch<React.SetStateAction<string[]>>;
  selectedShowOnlyPropertiesFor: string[];
  setSelectedShowOnlyPropertiesFor: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  selectedCountryValue: string;
  setSelectedCountryValue: React.Dispatch<React.SetStateAction<string>>;
  cities: City[];
  neighborhoods: Neighbourhood[];
  setNeighborhoods: React.Dispatch<React.SetStateAction<Neighbourhood[]>>;
  filteredCities: City[];
  isRadiusActive: boolean;
  setIsRadiusActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  selectedNeighbourhood: Neighbourhood[];
  setSelectedNeighbourhood: React.Dispatch<
    React.SetStateAction<Neighbourhood[]>
  >;
  selectedRadius: string;
  setSelectedRadius: React.Dispatch<React.SetStateAction<string>>;
  selectedRadiusValue: number;
  setSelectedRadiusValue: React.Dispatch<React.SetStateAction<number>>;
  selectedLat: number;
  selectedLng: number;
  setSelectedLat: React.Dispatch<React.SetStateAction<number>>;
  setSelectedLng: React.Dispatch<React.SetStateAction<number>>;
  searchCityQuery: string;
  setSearchCityQuery: React.Dispatch<React.SetStateAction<string>>;
  viewport: ViewState;
  setViewport: React.Dispatch<React.SetStateAction<ViewState>>;
  mapRef: any;
};

const userPreferencesContext = createContext({} as UserPreferencesContext);

export const useUserPreferences = () => useContext(userPreferencesContext);

export default function UserPreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  // User preferences

  const [type, setType] = useState<string>("NEIGHBOURHOODS");

  // the count of weekly matches
  const [matches, setMatches] = useState<number>(0);

  const [cities, setCities] = useState<City[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighbourhood[]>([]);

  const [maxTravelTime, setMaxTravelTime] = useState<number>(15);
  const [transportType, setTransportType] = useState<string>("WALKING");
  const [minBeds, setMinBeds] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [minFloorArea, setMinFloorArea] = useState<number>(0);
  const [furnished, setFurnished] = useState<boolean | null>(null);
  const [nice_to_have, setNiceToHave] = useState<
    { id: number; label: string; value: string }[]
  >([
    { id: 1, label: "Garden", value: "GARDEN" },
    { id: 2, label: "Balcony", value: "BALCONY" },
    { id: 3, label: "Bath", value: "BATH" },
  ]);
  const [also_search_for, setAlsoSearchFor] = useState<
    { id: number; label: string; value: string }[]
  >([
    {
      id: 1,
      label: "Properties from paid rental websites",
      value: "PROPERTIES_FROM_PAID_RENTAL_WEBSITES",
    },
    {
      id: 2,
      label: "Single rooms in shared houses",
      value: "SINGLE_ROOMS_IN_SHARED_HOUSES",
    },
    {
      id: 3,
      label: "Properties with a priority list",
      value: "PROPERTIES_WITH_A_PRIORITY_LIST",
    },
    {
      id: 4,
      label: "Senior housing",
      value: "SENIOR_HOUSING",
    },
  ]);
  const [show_only_properties_for, setShowOnlyPropertiesFor] = useState<
    { id: number; label: string; value: string }[]
  >([
    { id: 1, label: "Students", value: "STUDENTS" },
    { id: 2, label: "Cohabitants", value: "COHABITANTS" },
    { id: 3, label: "Pet owners", value: "PET_OWNERS" },
  ]);
  const [address, setAddress] = useState<string>("");
  const [point, setPoint] = useState<number[]>([]);

  // Selected values
  const [selectedCountry, setSelectedCountry] = useState("Netherlands");
  const [selectedCountryValue, setSelectedCountryValue] = useState("NL");
  const [selectedCity, setSelectedCity] = useState<string>("Amsterdam");
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<
    Neighbourhood[]
  >([]);
  const [selectedRadius, setSelectedRadius] = useState<string>("+ 8 km");
  const [selectedRadiusValue, setSelectedRadiusValue] = useState<number>(8);
  const [selectedNiceToHave, setSelectedNiceToHave] = useState<string[]>([]);
  const [selectedAlsoSearchFor, setSelectedAlsoSearchFor] = useState<string[]>(
    []
  );
  const [selectedShowOnlyPropertiesFor, setSelectedShowOnlyPropertiesFor] =
    useState<string[]>([]);

  // radius
  const [radius, setRadius] = useState<Radius[]>([
    { id: 1, label: 2, value: 200 },
    { id: 2, label: 3, value: 300 },
    { id: 3, label: 5, value: 500 },
    { id: 4, label: 8, value: 800 },
    { id: 5, label: 10, value: 1000 },
    { id: 6, label: 15, value: 1500 },
    { id: 7, label: 20, value: 2000 },
  ]);

  console.log(selectedCity);

  // fetching cities from api
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities(selectedCountryValue);
        setCities(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCities();
  }, [selectedCountryValue]);

  // fetching neighborhoods from api
  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        // Fetch neighborhoods for the selected city dynamically using selectedCity's id
        const city = cities.find((city) => city.name === selectedCity);
        if (city) {
          const data = await getNeighborhoods(String(city.id));
          setNeighborhoods(data);
          setSelectedNeighbourhood(data);
        }
      } catch (e) {
        console.error("Error fetching neighborhoods:", e);
      }
    };

    // Only fetch neighborhoods if a valid city is selected
    if (selectedCity) {
      fetchNeighborhoods();
    }
  }, [selectedCity, cities]);

  // state for switching dropdown menu
  const [isRadiusActive, setIsRadiusActive] = useState<boolean>(false);

  // state with selected city coordinates
  const [selectedLng, setSelectedLng] = useState<number>(4.9041389);
  const [selectedLat, setSelectedLat] = useState<number>(52.3675734);

  // searching logic
  const [searchCityQuery, setSearchCityQuery] = useState<string>("");

  const filteredCities = cities.filter((city: City) =>
    city.name.toLowerCase().includes(searchCityQuery.toLowerCase())
  );

  // map state
  const [viewport, setViewport] = useState<ViewState>({
    longitude: 4.896029,
    latitude: 52.371807,
    zoom: 10,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    bearing: 0,
    pitch: 0,
  });

  // map ref
  const mapRef = useRef<any>(null);

  // update map's location based on selected from dropdown menu
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedLng, selectedLat],
        zoom: 10,
        speed: 1,
        curve: 1.2,
      });
    }
  }, [selectedLng, selectedLat]);

  useEffect(() =>
    window.addEventListener("click", () => setIsRadiusActive(false))
  );

  return (
    <userPreferencesContext.Provider
      value={{
        type,
        setType,
        matches,
        setMatches,
        country: selectedCountry,
        setCountry: setSelectedCountry,
        radius,
        setRadius,
        maxTravelTime,
        setMaxTravelTime,
        transportType,
        setTransportType,
        minBeds,
        setMinBeds,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        minFloorArea,
        setMinFloorArea,
        furnished,
        setFurnished,
        nice_to_have,
        setNiceToHave,
        also_search_for,
        setAlsoSearchFor,
        show_only_properties_for,
        setShowOnlyPropertiesFor,
        address,
        setAddress,
        point,
        setPoint,
        selectedNiceToHave,
        setSelectedNiceToHave,
        selectedAlsoSearchFor,
        setSelectedAlsoSearchFor,
        selectedShowOnlyPropertiesFor,
        setSelectedShowOnlyPropertiesFor,
        selectedCountryValue,
        setSelectedCountryValue,
        cities,
        neighborhoods,
        setNeighborhoods,
        filteredCities,
        selectedCity,
        setSelectedCity,
        selectedNeighbourhood,
        setSelectedNeighbourhood,
        isRadiusActive,
        setIsRadiusActive,
        selectedRadius,
        setSelectedRadius,
        selectedRadiusValue,
        setSelectedRadiusValue,
        selectedLat,
        selectedLng,
        setSelectedLat,
        setSelectedLng,
        searchCityQuery,
        setSearchCityQuery,
        viewport,
        setViewport,
        mapRef,
      }}
    >
      {children}
    </userPreferencesContext.Provider>
  );
}
