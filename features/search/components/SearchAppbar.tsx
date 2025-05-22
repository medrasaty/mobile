import { useTheme } from "react-native-paper/src/core/theming";
import { useSearchStore } from "../store";
import { BackHandler, Keyboard } from "react-native";
import React, { useEffect } from "react";
import { router, useFocusEffect } from "expo-router";
import { Appbar, Searchbar } from "react-native-paper";

export const HomeSearchAppbar = () => {
  const theme = useTheme();
  const { query, setQuery, setSearchActive, isSearchActive, clearSearch } =
    useSearchStore();

  // Handle back button press to exit search mode
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (setSearchActive) {
          setSearchActive(false);
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [setSearchActive]);

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

  const handleSearch = () => {
    if (query.trim() !== "") {
      // Important to prevent UI glitch
      Keyboard.dismiss();

      router.push({
        pathname: "/search/questions",
        params: { q: query },
      });
    }
  };

  const handleClose = () => {
    setQuery("");
    setSearchActive(false);
  };

  return (
    <Appbar.Header>
      <Searchbar
        onChangeText={(text) => setQuery(text)}
        style={{ backgroundColor: theme.colors.surface }}
        icon={"arrow-right"}
        onIconPress={handleClose}
        onSubmitEditing={handleSearch}
        showDivider={false}
        autoFocus
        mode="view"
        value={query}
      />
    </Appbar.Header>
  );
};
