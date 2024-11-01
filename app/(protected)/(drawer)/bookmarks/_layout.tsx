import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useTopTabsScreenOptions from "@/features/navigation/hooks/useTopTabsScreenOptions";
import TopTabs from "@/features/navigation/layouts/TopTabs";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";

type BookmarksLayoutProps = {};

const BookmarksLayout = () => {
  const options = useTopTabsScreenOptions();
  return <TopTabs screenOptions={options} />;
};

export default BookmarksLayout;
