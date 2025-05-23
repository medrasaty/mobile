import React, { useCallback, useEffect, useState } from "react";

import { BackHandler } from "react-native";
import { Appbar, Searchbar, useTheme } from "react-native-paper";
import { useSearchStore } from "../store";
import { useFocusEffect } from "expo-router";

export type BaseSearchAppbarProps = {
  /**
   * Initial query value
   */
  initialQuery?: string;
  /**
   * Callback when search is submitted
   */
  onSearch: (query: string) => void;
  /**
   * Callback when search is closed/canceled
   */
  onClose?: () => void;
  /**
   * Whether to show a back button instead of close
   */
  showBackButton?: boolean;
  /**
   * Whether to update the query in the store on every change
   */
  updateOnChange?: boolean;
  /**
   * Placeholder text for the search bar
   */
  placeholder?: string;
};

/**
 * Base component for all search appbars to reduce duplication
 */
export const BaseSearchAppbar = ({
  initialQuery = "",
  onSearch,
  onClose,
  showBackButton = false,
  updateOnChange = false,
  placeholder = "Search...",
}: BaseSearchAppbarProps) => {
  const theme = useTheme();
  const { setQuery, clearSearch, isSearchActive } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(initialQuery);

  // Handle back button press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (onClose) {
          onClose();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [onClose]);

  // Clear search when screen loose focus
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (isSearchActive) {
          clearSearch();
        }
      };
    }, [isSearchActive])
  );

  const handleQueryChange = (text: string) => {
    setLocalQuery(text);
    // If configured to update on change, update the store immediately
    if (updateOnChange) {
      setQuery(text);
    }
  };

  const handleSearch = () => {
    // Always update the store when search is submitted
    setQuery(localQuery);
    onSearch(localQuery);
  };

  return (
    <Appbar.Header>
      <Searchbar
        placeholder={placeholder}
        onChangeText={handleQueryChange}
        value={localQuery}
        style={{
          flex: 1,
          backgroundColor: theme.colors.surface,
          marginRight: showBackButton ? 8 : 0,
        }}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoCapitalize="none"
        autoFocus={!showBackButton}
        icon={showBackButton ? undefined : "arrow-left"}
        onIconPress={showBackButton ? undefined : onClose}
      />
    </Appbar.Header>
  );
};

export default BaseSearchAppbar;

