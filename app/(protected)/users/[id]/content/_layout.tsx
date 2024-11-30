import useTopTabsScreenOptions from "@/features/navigation/hooks/useTopTabsScreenOptions";
import TopTabs from "@/features/navigation/layouts/TopTabs";
import { t } from "i18next";

const UserContentLayout = () => {
  const screenOptions = useTopTabsScreenOptions();
  return (
    <TopTabs layoutDirection={"rtl"} screenOptions={screenOptions}>
      <TopTabs.Screen name="questions" options={{ title: t("questions") }} />
      <TopTabs.Screen name="answers" options={{ title: t("answers") }} />
    </TopTabs>
  );
};

export default UserContentLayout;
