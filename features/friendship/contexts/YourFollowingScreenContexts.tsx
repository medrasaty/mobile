import { FilterOption } from "@/components/FilterOptionsView";
import React, {
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export type YourFollowingRequestsScreenContext = {
  filter: FilterOption["value"];
  setFilter: Dispatch<SetStateAction<FilterOption["value"]>>;
  filterOptions: FilterOption[];
};

export const YourFollowingRequestsScreenContext =
  createContext<YourFollowingRequestsScreenContext | null>(null);

export function useYourFollowingScreenContext() {
  const value = useContext(YourFollowingRequestsScreenContext);

  if (!value) {
    throw new Error(
      "useYourFollowingScreenContext must be used within a YourFollowingRequestsScreenProvider "
    );
  }

  return value;
}
