import useTopTabsScreenOptions from "@features/navigation/hooks/useTopTabsScreenOptions";
import TopTabs from "@features/navigation/layouts/TopTabs";
import { useTranslation } from "react-i18next";

const SearchLayout = () => {
  const screenOptions = useTopTabsScreenOptions();
  const { t } = useTranslation();
  return (
    <TopTabs screenOptions={screenOptions}>
      <TopTabs.Screen name="questions" options={{ title: t("questions") }} />
      <TopTabs.Screen name="users" options={{ title: t("users") }} />
      <TopTabs.Screen name="schools" options={{ title: t("schools") }} />
    </TopTabs>
  );
};

export default SearchLayout;
