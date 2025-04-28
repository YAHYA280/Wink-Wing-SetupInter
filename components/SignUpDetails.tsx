"use client";
// next
import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";

// context
import { useUserPreferences } from "@/context/userPreferencesContext";

// multi select
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

// data
import { furnishedOptions } from "@/data/signupOptions";

// translation service
import { useSignUpData } from "@/services/translationService";

export default function SignUpDetails() {
  const {
    furnished,
    setFurnished,
    nice_to_have,
    selectedNiceToHave,
    setSelectedNiceToHave,
    also_search_for,
    selectedAlsoSearchFor,
    setSelectedAlsoSearchFor,
    show_only_properties_for,
    selectedShowOnlyPropertiesFor,
    setSelectedShowOnlyPropertiesFor,
  } = useUserPreferences();

  // Local state for furnished dropdown
  const [localSelectedFurnished, setLocalSelectedFurnished] = useState<string>("");
  
  // Get the current locale and fetch translations
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: signupData, status } = useSignUpData();

  // Default content for fallback
  const defaultDetailsContent = {
    furnished_label: "Furnished",
    furnished: [
      { id: 1, label: "Doesn't matter", value: null },
      { id: 2, label: "Furnished", value: "Furnished" },
      { id: 3, label: "Unfurnished", value: "Unfurnished" },
    ],
    additional_features_label: "Additional features",
    additional_features: null,
    also_search_for_label: "Also search for",
    also_search_for: null,
    show_only_properties_for_label: "Show only properties for",
    show_only_properties_for: null,
    placeHolder_Optional:"Optional",
    placeHolder_Nothing:"Nothing selected",
    PlaceHolder_Dmatter:"Doesn't matter",
    requirement_text:"These are not hard requirements, but we give extra priority to homes with these requirements.",
  };

  // Merge API data with defaults using useMemo
  const detailsContent = useMemo(() => {
    if (status === "success" && signupData?.SignupDetails) {
      return {
        ...defaultDetailsContent,
        ...signupData.SignupDetails,
      };
    }
    return defaultDetailsContent;
  }, [signupData, status]);

  // Synchronize furnished selection from context
  useEffect(() => {
    // Set the label based on the furnished value
    if (furnished === true) {
      setLocalSelectedFurnished("Furnished");
    } else if (furnished === false) {
      setLocalSelectedFurnished("Unfurnished");
    } else {
      setLocalSelectedFurnished("Doesn't matter");
    }
  }, [furnished]);

  const [isFurnishedActive, setIsFurnishedActive] = useState<boolean>(false);

  const showOnlyPropertiesForSelectedItemsLabel =
    selectedShowOnlyPropertiesFor.length >= 2
      ? `${selectedShowOnlyPropertiesFor.length} options selected`
      : undefined;

  const showOnlyPropertiesForChange = (e: MultiSelectChangeEvent) => {
    // e.value is an array of selected label values
    const selectedValues = e.value as string[];

    // Store only the values (not the full objects) in state
    setSelectedShowOnlyPropertiesFor(selectedValues);
  };

  const niceToHavesSelectedItemsLabel =
    selectedNiceToHave.length >= 2
      ? `${selectedNiceToHave.length} options selected`
      : undefined;

  const niceToHaveChange = (e: MultiSelectChangeEvent) => {
    // e.value is an array of selected label values
    const selectedValues = e.value as string[];

    // Store only the values (not the full objects) in state
    setSelectedNiceToHave(selectedValues);
  };

  const alsoSearchForSelectedItemsLabel =
    selectedAlsoSearchFor.length >= 2
      ? `${selectedAlsoSearchFor.length} options selected`
      : undefined;

  const alsoSearchForChange = (e: MultiSelectChangeEvent) => {
    // e.value is an array of selected label values
    const selectedValues = e.value as string[];

    // Store only the values (not the full objects) in state
    setSelectedAlsoSearchFor(selectedValues);
  };

  useEffect(() =>
    window.addEventListener("click", () => setIsFurnishedActive(false))
  );

  return (
    <div className="flex flex-col gap-7 w-full">
      <div className="flex flex-col md:flex-row gap-7">
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col relative"
        >
          <label className="font-bold text-[16px] leading-[24px] w-max">
            {detailsContent.furnished_label}
          </label>
          <button
            onClick={() => setIsFurnishedActive(!isFurnishedActive)}
            className="flex items-center justify-between border border-[#CED4D9] rounded-lg py-[6px] px-3 w-full md:w-[270px] lg:w-[330px]"
          >
           {localSelectedFurnished || detailsContent.PlaceHolder_Dmatter}
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
          </button>

          <div
            className={
              isFurnishedActive
                ? "absolute top-[110%] z-10 left-0 bg-white p-2 border border-[#dddfe2] rounded-lg w-full"
                : "hidden"
            }
          >
            <div className="flex flex-col items-start font-medium text-lg pt-2">
              {detailsContent.furnished.map((option) => (
                <button
                  className="xl:hover:bg-main xl:hover:text-white w-full text-left px-2 rounded-lg transition-all duration-300"
                  key={option.id}
                  value={option.value!}
                  onClick={() => {
                    setLocalSelectedFurnished(option.label);
                    setFurnished(
                      option.value === "Furnished"
                        ? true
                        : option.value === "Unfurnished"
                        ? false
                        : null
                    );
                    setIsFurnishedActive(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col relative">
          <div className="flex items-center gap-1 font-bold text-[16px] leading-[24px] w-max">
            {detailsContent.additional_features_label}
            <button className="group relative">
              <svg
                width="17"
                height="21"
                viewBox="0 0 17 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  x="-0.00488281"
                  y="0.800049"
                  width="17"
                  height="20"
                  fill="url(#pattern0_4_446)"
                />
                <defs>
                  <pattern
                    id="pattern0_4_446"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_4_446"
                      transform="matrix(0.0131579 0 0 0.0111842 0 -0.00328947)"
                    />
                  </pattern>
                </defs>
              </svg>
              <div className="absolute top-[-120px] right-[-95px] items-center justify-center w-[206px] h-[108px] py-2 px-6 bg-help bg-center bg-cover hidden group-hover:flex">
                <h3 className="text-[13px] leading-[20px] text-white text-left">
                  {detailsContent.requirement_text}
                </h3>
              </div>
            </button>
          </div>
          <MultiSelect
            value={selectedNiceToHave}
            onChange={niceToHaveChange}
            options={nice_to_have}
            optionLabel="label"
            optionValue="value"
            display="chip"
            placeholder={detailsContent.placeHolder_Optional}
            selectedItemTemplate={niceToHavesSelectedItemsLabel}
            maxSelectedLabels={1}
            className="border border-[#CED4D9] rounded-lg py-1 px-3 w-full md:w-[270px] lg:w-[330px]"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-7">
        <div className="flex flex-col">
          <label className="font-bold text-[16px] leading-[24px] w-max">
            {detailsContent.also_search_for_label}
          </label>
          <MultiSelect
            value={selectedAlsoSearchFor}
            onChange={alsoSearchForChange}
            options={also_search_for}
            optionLabel="label"
            optionValue="value"
            display="chip"
            selectedItemTemplate={alsoSearchForSelectedItemsLabel}
            maxSelectedLabels={1}
            placeholder={detailsContent.placeHolder_Nothing}
            className="border border-[#CED4D9] rounded-lg py-1 px-3 w-full md:w-[270px] lg:w-[330px]"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 font-bold text-[16px] leading-[24px] w-max">
            {detailsContent.show_only_properties_for_label}
            <button className="group relative">
              <svg
                width="17"
                height="21"
                viewBox="0 0 17 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  x="-0.00488281"
                  y="0.800049"
                  width="17"
                  height="20"
                  fill="url(#pattern0_4_446)"
                />
                <defs>
                  <pattern
                    id="pattern0_4_446"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_4_446"
                      transform="matrix(0.0131579 0 0 0.0111842 0 -0.00328947)"
                    />
                  </pattern>
                </defs>
              </svg>
              <div className="absolute top-[-120px] right-[-95px] items-center justify-center w-[206px] h-[108px] py-2 px-6 bg-help bg-center bg-cover hidden group-hover:flex">
                <h3 className="text-[13px] leading-[20px] text-white text-left">
                  If a property is not clear about these requirements, we will
                  forward it to you just to be sure.
                </h3>
              </div>
            </button>
          </div>
          <MultiSelect
            value={selectedShowOnlyPropertiesFor}
            onChange={showOnlyPropertiesForChange}
            options={show_only_properties_for}
            optionLabel="label"
            optionValue="value"
            display="chip"
            selectedItemTemplate={showOnlyPropertiesForSelectedItemsLabel}
            maxSelectedLabels={1}
            placeholder={detailsContent.placeHolder_Nothing}
            className="border border-[#CED4D9] rounded-lg py-1 px-3 w-full md:w-[270px] lg:w-[330px]"
          />
        </div>
      </div>
    </div>
  );
}