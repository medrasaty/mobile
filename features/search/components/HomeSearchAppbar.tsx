import React from "react";
import { router } from "expo-router";
import { useSearchStore } from "../store";
import { BaseSearchAppbar } from "./BaseSearchAppbar";

/**
 * Search appbar used on the home screen
 * Updates the query on change and navigates to results on submit
 */
export const HomeSearchAppbar = () => {
  const { query, setSearchActive } = useSearchStore();

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim() !== "") {
      router.push({
        pathname: "/search/questions",
        params: { q: searchQuery },
      });
    }
  };

  const handleClose = () => {
    setSearchActive(false);
  };

  return (
    <BaseSearchAppbar
      initialQuery={query}
      onSearch={handleSearch}
      onClose={handleClose}
      updateOnChange={true}
      placeholder="Search questions, users, schools..."
    />
  );
};

export default HomeSearchAppbar; 