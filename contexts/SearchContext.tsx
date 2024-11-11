import React, {
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { useEffect } from "react";
import { Searchbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackHandler, useWindowDimensions } from "react-native";
import { MotiView } from "moti";

export type SearchContextType = {
  searchValue: string;
  isSearch: boolean;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export function SearchContextProvider({ children }: React.PropsWithChildren) {
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        isSearch,
        setIsSearch,
        searchValue,
        setSearchValue,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const value = useContext(SearchContext);

  if (!value) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }

  return value;
}

export const SearchContextbar = () => {
  const { searchValue, setSearchValue, isSearch, setIsSearch } =
    useSearchContext();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { width } = useWindowDimensions();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      setIsSearch(false);
    });
  }, []);

  const handleClose = () => {
    setSearchValue("");
    setIsSearch(false);
  };

  return (
    <MotiView
      animate={{ width: isSearch ? width : 0 }}
      style={{ marginTop: insets.top - 8 }}
    >
      <Searchbar
        onChangeText={(text) => setSearchValue(text)}
        style={[{ backgroundColor: theme.colors.surface }]}
        icon={"arrow-right"}
        onIconPress={handleClose}
        showDivider={false}
        autoFocus
        mode="view"
        value={searchValue}
      />
    </MotiView>
  );
};

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchbar: {
    height: 63.9, // Same as Appbar
  },
});
