// primereact
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";

// context
import { useUserPreferences } from "@/context/userPreferencesContext";

// translation service
import { useSignUpData } from "@/services/translationService";

interface NeighbourhoodDropdownProps {
  neighbourhoodLabel?: string; 
}

export default function NeighbourhoodDropdown({
  neighbourhoodLabel,
}: NeighbourhoodDropdownProps) {
  const { selectedNeighbourhood, neighborhoods, setSelectedNeighbourhood } =
    useUserPreferences();

  // Get translations (use this as a fallback if the prop isn't provided)
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: signupData, status } = useSignUpData();

  // If neighbourhoodLabel prop is not provided, use the one from API
  const labelFromApi = useMemo(() => {
    if (status === "success" && signupData?.SignupLocation) {
      return signupData.SignupLocation.neighbourhoods;
    }
    return "Neighbourhoods"; // Default fallback
  }, [signupData, status]);

  // Use the prop if provided, otherwise use the one from API
  const displayLabel = neighbourhoodLabel || labelFromApi;

  const selectedItemsLabel =
    selectedNeighbourhood.length >= 3
      ? `${selectedNeighbourhood.length} ${displayLabel.toLowerCase()} selected`
      : undefined;

  const handleNeighbourhoodChange = (e: MultiSelectChangeEvent) => {
    const selectedIds = e.value as number[]; // Array of selected ids
    const selectedItems = neighborhoods.filter((neighbourhood) =>
      selectedIds.includes(neighbourhood.id)
    );

    setSelectedNeighbourhood(selectedItems); // Updates with full objects
  };

  return (
    <div className="flex flex-col gap-1 items-start">
      <h3 className="font-semibold text-lg text-[#615D5D]">{displayLabel}</h3>
      <div className="relative z-10">
        <MultiSelect
          value={selectedNeighbourhood.map((n) => n.id)}
          onChange={handleNeighbourhoodChange}
          options={neighborhoods}
          optionLabel="name"
          optionValue="id"
          display="chip"
          placeholder={`Select ${displayLabel}`}
          selectedItemTemplate={selectedItemsLabel}
          maxSelectedLabels={2}
          className="bg-[#efefef] xl:hover:bg-[#c1bfbf] transition-all duration-300 rounded-lg py-3 px-4 w-[320px] cursor-pointer"
        />
      </div>
    </div>
  );
}
