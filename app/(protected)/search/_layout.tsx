import useTopTabsScreenOptions from "@features/navigation/hooks/useTopTabsScreenOptions";
import TopTabs from "@features/navigation/layouts/TopTabs";
import { View, ViewProps } from "react-native";

const SearchLayout = () => {
  const screenOptions = useTopTabsScreenOptions();
  return <TopTabs screenOptions={screenOptions} />;
};

export default SearchLayout;
