"use client";
// icons
import { IoSearch } from "react-icons/io5";

//next
import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

// context
import { useUserPreferences } from "@/context/userPreferencesContext";

export default function CitySearch() {
  const { searchCityQuery, setSearchCityQuery, setSelectedCity } =
    useUserPreferences();

  const router = useRouter();

  const handleSubmitSearch = (e: FormEvent) => {
    if (searchCityQuery) {
      e.preventDefault();
      setSelectedCity(searchCityQuery);
      router.push("/signup");
    }
  };

  return (
    <div className="w-full bg-searchCity bg-cover bg-center">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center justify-center gap-[70px] py-24 lg:py-[120px] px-2 max-w-[1164px] mx-auto text-white">
        <div className="flex flex-col items-center justify-center lg:items-start gap-9">
          {/* reviews */}
          {/* <div className="flex flex-wrap justify-center items-center gap-5">
            <h1 className="text-[20px] font-semibold text-white">Excelent</h1>
            <img src="/hero-review.svg" alt="Hero Review" />
            <h3 className="font-medium text-lg text-white">1,215 Reviews on</h3>
            <img src="/searchcity-trustpilot.svg" alt="TrustPilot" />
          </div> */}

          {/* title */}
          <h1 className="font-extrabold text-4xl leading-[41px] text-center lg:text-left text-white max-w-[490px]">
            Enter your desired city and let WinkWing do the rest
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
              placeholder="Type your city"
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
            Search now
          </button>
        </form>
      </div>
    </div>
  );
}
