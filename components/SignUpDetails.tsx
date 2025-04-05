"use client";
// next
import { useEffect, useState } from "react";

// context
import { useUserPreferences } from "@/context/userPreferencesContext";

// multi select
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

// data
import { furnishedOptions } from "@/data/signupOptions";

export default function SignUpDetails() {
  const {
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

  const [isFurnishedActive, setIsFurnishedActive] = useState<boolean>(false);

  const [selectedFurnished, setSelectedFurnished] =
    useState<string>("Doesn't matter");

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
    selectedAlsoSearchFor.length >= 2
      ? `${selectedAlsoSearchFor.length} options selected`
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
            Furnished
          </label>
          <button
            onClick={() => setIsFurnishedActive(!isFurnishedActive)}
            className="flex items-center justify-between border border-[#CED4D9] rounded-lg py-[6px] px-3 w-full md:w-[270px] lg:w-[330px]"
          >
            {selectedFurnished}
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
              {furnishedOptions.map((option) => (
                <button
                  className="xl:hover:bg-main xl:hover:text-white w-full text-left px-2 rounded-lg transition-all duration-300"
                  key={option.id}
                  value={option.value!}
                  onClick={() => {
                    setSelectedFurnished(option.label);
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
            Additional features
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
                  <image
                    id="image0_4_446"
                    width="76"
                    height="90"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
              <div className="absolute top-[-120px] right-[-95px] items-center justify-center w-[206px] h-[108px] py-2 px-6 bg-help bg-center bg-cover hidden group-hover:flex">
                <h3 className="text-[13px] leading-[20px] text-white text-left">
                  These are not hard requirements, but we give extra priority to
                  homes with these requirements.
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
            placeholder="Optional"
            selectedItemTemplate={niceToHavesSelectedItemsLabel}
            maxSelectedLabels={1}
            className="border border-[#CED4D9] rounded-lg py-1 px-3 w-full md:w-[270px] lg:w-[330px]"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-7">
        <div className="flex flex-col">
          <label className="font-bold text-[16px] leading-[24px] w-max">
            Also search
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
            placeholder="Nothing selected"
            className="border border-[#CED4D9] rounded-lg py-1 px-3 w-full md:w-[270px] lg:w-[330px]"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 font-bold text-[16px] leading-[24px] w-max">
            Show only properties for
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
                  <image
                    id="image0_4_446"
                    width="76"
                    height="90"
                    xlinkHref="data:image/png;base64,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"
                  />
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
            placeholder="Nothing selected"
            className="border border-[#CED4D9] rounded-lg py-1 px-3 w-full md:w-[270px] lg:w-[330px]"
          />
        </div>
      </div>
    </div>
  );
}
