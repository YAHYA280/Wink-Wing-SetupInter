// primereact
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

// context
import { useUserPreferences } from "@/context/userPreferencesContext";

export default function NeighbourhoodDropdown() {
  const { selectedNeighbourhood, neighborhoods, setSelectedNeighbourhood } =
    useUserPreferences();

  const selectedItemsLabel =
    selectedNeighbourhood.length >= 3
      ? `${selectedNeighbourhood.length} neighbourhoods selected`
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
      <h3 className="font-semibold text-lg text-[#615D5D]">Neighbourhoods</h3>
      <div className="relative z-10">
        <MultiSelect
          value={selectedNeighbourhood.map((n) => n.id)}
          onChange={handleNeighbourhoodChange}
          options={neighborhoods}
          optionLabel="name"
          optionValue="id"
          display="chip"
          placeholder="Select Neighbourhoods"
          selectedItemTemplate={selectedItemsLabel}
          maxSelectedLabels={2}
          className="bg-[#efefef] xl:hover:bg-[#c1bfbf] transition-all duration-300 rounded-lg py-3 px-4 w-[320px] cursor-pointer"
        />
      </div>
    </div>
  );
}
