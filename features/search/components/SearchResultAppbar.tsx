import React from "react";
import { router, useNavigation } from "expo-router";
import { useSearchStore } from "../store";
import { BaseSearchAppbar } from "./BaseSearchAppbar";
import { NavigationProp } from "@react-navigation/native";

type SearchResultAppbarProps = {
  /**
   * Optional callback that runs when the query is submitted
   */
  onSubmit?: () => void;

  /**
   * Optional navigation object
   */
  navigation?: NavigationProp<any>;
};

/**
 * Searchbar component for search result screens
 * Only updates the query in the store when search is submitted
 * Can be used both as a standalone component and as a header in stack navigation
 */
export const SearchResultAppbar = ({ onSubmit, navigation, ...props }: SearchResultAppbarProps) => {
  const { query } = useSearchStore();
  const stackNavigation = navigation || useNavigation();

  const handleSearch = (searchQuery: string) => {
    // Call optional callback if provided
    if (onSubmit) {
      onSubmit();
    }
  };

  const handleGoBack = () => {
    // Use provided navigation if available (from stack header props)
    if (stackNavigation?.canGoBack?.()) {
      stackNavigation.goBack();
    } else {
      router.back();
    }
  };

  return (
    <BaseSearchAppbar
      initialQuery={query}
      onSearch={handleSearch}
      onClose={handleGoBack}
      showBackButton={true}
      updateOnChange={false}
      placeholder="Search..."
    />
  );
};

export default SearchResultAppbar; 