import { FilterOption } from "@/components/FilterOptionsView";
import { useState, useEffect } from "react";

type useFilterOptionsProps = FilterOption[];
type useFilterOptionsHook = {};

export default function useFilterOptions(options: useFilterOptionsProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>(options);

  const [currentFilter, setCurrentFilter] = useState<FilterOption["value"]>(
    filterOptions[0].value
  );

  return {
    options: filterOptions,
    currentFilter,
    onFilterChange: (value: FilterOption["value"]) => setCurrentFilter(value),
  };
}
