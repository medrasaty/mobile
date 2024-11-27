import { useState } from "react";
import { View, ViewProps } from "react-native";
import { Searchbar } from "react-native-paper";
import { SearchBar } from "react-native-screens";

type MainSearchBarProps = {} & ViewProps;

const MainSearchBar = ({ ...props }: MainSearchBarProps) => {
  const [search, setSearch] = useState("");
  return <Searchbar value={search} mode="view" />;
};

export default MainSearchBar;
