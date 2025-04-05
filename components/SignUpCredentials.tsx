"use client";
// next
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

// context
import { useUserPreferences } from "@/context/userPreferencesContext";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { clearError, register } from "@/store/features/authSlice";

// icons
import { GrClose } from "react-icons/gr";

// data
import { userTypeOptions } from "@/data/signupOptions";

export default function SignUpCredentials() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const {
    radius,
    maxTravelTime,
    transportType,
    minPrice,
    maxPrice,
    minBeds,
    minFloorArea,
    furnished,
    selectedNiceToHave,
    selectedAlsoSearchFor,
    selectedShowOnlyPropertiesFor,
    address,
    point,
    setPoint,
    selectedNeighbourhood,
    selectedCity,
    cities,
    selectedLat,
    selectedLng,
    selectedRadiusValue,
  } = useUserPreferences();

  const { type, selectedCountryValue } = useUserPreferences();

  const [isUserTypeActive, setIsUserTypeActive] = useState<boolean>(false);

  const [selectedUserType, setSelectedUserType] =
    useState<string>("Type of user");
  const [selectedUserTypeValue, setSelectedUserTypeValue] =
    useState<string>("");

  // Map over selectedNeighbourhoods and extract only the id
  const neighbourhoodsID = selectedNeighbourhood.map((neighborhood) => ({
    id: neighborhood.id,
  }));

  // Find and extract the id of selected city
  const city = cities.find((city) => city.name === selectedCity);

  useEffect(() => {
    setPoint([selectedLng, selectedLat]);
  }, [selectedCity, selectedLat, selectedLng]);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    const registerBody = {
      email,
      password,
      country: selectedCountryValue,
      name,
      type,
      cityId: Number(city?.id),
      maxTravelTime,
      transportType,
      minPrice,
      maxPrice,
      minBeds,
      minFloorArea,
      furnished,
      neighbourhoods: neighbourhoodsID,
      nice_to_have: selectedNiceToHave,
      also_search_for: selectedAlsoSearchFor,
      show_only_properties_for: selectedShowOnlyPropertiesFor,
      userType: selectedUserTypeValue,
      address,
      point,
      radius: selectedRadiusValue,
      geometry: {
        type: "MultiPolygon",
        coordinates: [
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
          [
            [
              [4.98675, 52.36511],
              [4.99078, 52.36377],
              [4.98044, 52.35856],
              [4.97451, 52.36158],
              [4.98675, 52.36511],
            ],
          ],
          [
            [
              [5.01415, 52.37169],
              [5.01251, 52.37244],
              [5.01314, 52.37307],
              [5.01456, 52.37296],
              [5.01415, 52.37169],
            ],
          ],
          [
            [
              [5.02152, 52.38412],
              [5.01838, 52.38039],
              [5.0143, 52.37417],
              [5.01834, 52.38345],
              [5.0237, 52.38685],
              [5.02152, 52.38412],
            ],
          ],
          [
            [
              [4.76656, 52.42755],
              [4.85608, 52.41666],
              [4.86268, 52.42994],
              [4.87074, 52.43039],
              [4.93072, 52.41161],
              [4.95277, 52.42368],
              [4.98264, 52.42676],
              [5.03004, 52.41564],
              [5.06841, 52.41545],
              [5.03153, 52.40092],
              [5.02524, 52.38818],
              [5.00846, 52.38273],
              [5.01281, 52.37319],
              [4.99853, 52.37878],
              [4.98026, 52.37367],
              [4.95956, 52.38198],
              [4.98349, 52.36795],
              [5.01451, 52.36802],
              [4.95778, 52.36766],
              [4.97527, 52.35715],
              [4.99001, 52.35707],
              [4.99208, 52.36166],
              [5.00901, 52.35328],
              [5.01652, 52.35535],
              [5.01129, 52.34283],
              [4.99932, 52.34154],
              [4.96959, 52.3561],
              [4.94955, 52.33838],
              [4.91293, 52.33051],
              [4.90913, 52.31825],
              [4.85676, 52.32141],
              [4.85592, 52.33032],
              [4.81875, 52.32556],
              [4.75612, 52.35611],
              [4.75782, 52.39666],
              [4.72876, 52.40071],
              [4.73921, 52.43106],
              [4.76656, 52.42755],
            ],
          ],
        ],
      },
    };

    try {
      const result = await dispatch(register(registerBody));

      if (register.fulfilled.match(result)) {
        router.push("/welcome");
      }
    } catch (e: any) {
      console.error("Registration failed:", e);
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  function handleClearError() {
    dispatch(clearError());
  }

  return (
    <div>
      <h3 className="text-[14px] leading-[24px] mb-5">
        Start your search by creating an account. You'll receive your first
        matches today.
      </h3>

      <div className="flex flex-col items-center justify-center gap-7">
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col relative w-full"
        >
          <div
            onClick={() => setIsUserTypeActive(!isUserTypeActive)}
            className="flex items-center justify-between border border-[#CED4D9] cursor-pointer rounded-lg py-2 px-3 w-full"
          >
            {selectedUserType}
            <span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="p-icon p-multiselect-trigger-icon p-c"
                data-pc-section="triggericon"
              >
                <path
                  d="M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </div>

          <div
            className={
              isUserTypeActive
                ? "absolute top-[110%] z-10 left-0 bg-white p-2 border border-[#dddfe2] rounded-lg w-full"
                : "hidden"
            }
          >
            <div className="flex flex-col items-start font-medium text-lg pt-2">
              {userTypeOptions.map((option) => (
                <button
                  type="button"
                  className="xl:hover:bg-main xl:hover:text-white w-full text-left px-2 rounded-lg transition-all duration-300"
                  key={option.id}
                  value={option.value}
                  onClick={() => {
                    setSelectedUserType(option.label);
                    setSelectedUserTypeValue(option.value);
                    setIsUserTypeActive(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-center gap-7 w-full"
        >
          <input
            className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-required="true"
          />
          <div className="flex flex-col gap-7 w-full md:flex-row">
            <input
              className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
            <input
              className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4 w-full">
            <div className="flex items-center gap-2">
              <input type="checkbox" required aria-required="true" />
              <span className="flex items-center gap-1 font-semibold text-[15px] leading-[24px] text-[#808080]">
                I agree to the
                <Link className="text-main xl:hover:underline" href="/">
                  terms and conditions
                </Link>
              </span>
            </div>
            <button
              disabled={loading}
              className="bg-main rounded-lg border border-main font-semibold text-[16px] leading-[24px] w-full lg:w-[290px] py-2 px-9 text-white xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
              type="submit"
            >
              {loading ? "Loading..." : "Signup"}
            </button>
          </div>
        </form>
      </div>
      {error && (
        <div className="flex items-center justify-center w-full mt-4 bg-[#FAD1D5] relative border border-[#F45D48] py-3 px-8 rounded-lg">
          <span className="flex items-center justify-center text-center">
            {error || "Something went wrong"}
          </span>
          <button onClick={handleClearError} className="absolute right-4">
            <GrClose size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
