"use client";
// icons
import { IoSearch } from "react-icons/io5";

//next
import Link from "next/link";
import { FormEvent, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

// context
import { useUserPreferences } from "@/context/userPreferencesContext";

// service for translations
import { useSearchCity } from "@/services/translationService";

// Default city search content (fallback)
const defaultCitySearchContent = {
  title: "Enter your desired city and let WinkWing do the rest",
  placeholder: "Type your city",
  button: "Search now",
};

export default function CitySearch() {
  const { searchCityQuery, setSearchCityQuery, setSelectedCity } =
    useUserPreferences();

  const router = useRouter();

  // Get translations
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: citySearchData, status } = useSearchCity();

  // Merge API data with defaults using useMemo
  const citySearchContent = useMemo(() => {
    if (status === "success" && citySearchData) {
      return {
        ...citySearchData,
      };
    }
    return defaultCitySearchContent;
  }, [citySearchData, status]);

  const handleSubmitSearch = (e: FormEvent) => {
    if (searchCityQuery) {
      e.preventDefault();
      setSelectedCity(searchCityQuery);
      router.push(`${locale}/signup`)
    }
  };

  return (
    <div className="w-full bg-searchCity bg-cover bg-center">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center justify-center gap-[70px] py-24 lg:py-[120px] px-2 max-w-[1164px] mx-auto text-white">
        <div className="flex flex-col items-center justify-center lg:items-start gap-9">
          {/* title */}
          <h1 className="font-extrabold text-4xl leading-[41px] text-center lg:text-left text-white max-w-[490px]">
            {citySearchContent.title}
          </h1>
        </div>
        <form
          onSubmit={handleSubmitSearch}
          className="flex items-center justify-center relative pb-6 mr-8"
        >
          <div className="relative flex items-center">
            {/* Search Icon */}
            <span className="absolute left-3">
              <IoSearch fill="#fff" size={20} />
            </span>

            {/* Input Field */}
            <input
              className="bg-transparent border-[3px] outline-none text-[16px] border-white rounded-l-[38px] text-white placeholder:text-white pl-[40px] py-2 w-[200px] xs:w-[270px] h-[46px]"
              placeholder={citySearchContent.placeholder}
              type="text"
              value={searchCityQuery}
              onChange={(e) => setSearchCityQuery(e.target.value)}
              required
            />
          </div>

          {/* Search Button */}
          <button
            className="flex items-center justify-center bg-white font-bold text-[16px] text-[#0485C6] h-[46px] outline-none px-4 ml-[-10px] rounded-r-[38px]"
            type="submit"
            onClick={handleSubmitSearch}
          >
            {citySearchContent.button}
          </button>
        </form>
      </div>
    </div>
  );
}
