import React from "react";
import { router } from "expo-router";
import { useSearchStore } from "../store";
import { BaseSearchAppbar } from "./BaseSearchAppbar";
import { Keyboard } from "react-native";

/**
 * Search appbar used on the home screen
 * Updates the query on change and navigates to results on submit
 */
export const HomeSearchAppbar = () => {
  const { query, clearSearch } = useSearchStore();

  const handleSearch = (searchQuery: string) => {
    Keyboard.dismiss();
    if (searchQuery.trim() !== "") {
      router.push({
        pathname: "/search/questions",
        params: { q: searchQuery },
      });
    }
  };

  const handleClose = () => {
    clearSearch();
  };

  return (
    <BaseSearchAppbar
      initialQuery={query}
      onSearch={handleSearch}
      onClose={handleClose}
      updateOnChange={true}
      placeholder="Search..."
    />
  );
};

export default HomeSearchAppbar;

