import { create } from "zustand";
type SearchStore = {
  query: string;
  isSearchActive: boolean;
  setQuery: (query: string) => void;
  setSearchActive: (active: boolean) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  isSearchActive: false,
  setQuery: (query) => set({ query }),
  setSearchActive: (active) => set({ isSearchActive: active }),
}));
