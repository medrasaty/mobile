import React, {
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

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
