import useTopTabsScreenOptions from "@/features/navigation/hooks/useTopTabsScreenOptions";
import TopTabs from "@/features/navigation/layouts/TopTabs";
import { useTranslation } from "react-i18next";
import TopTabsBar from "@features/navigation/components/TopBar";

type FriendsLayoutProps = {};

const FriendsLayout = ({}: FriendsLayoutProps) => {
  const screenOptions = useTopTabsScreenOptions();
  const { t } = useTranslation();
  return (
    <TopTabs
      tabBar={TopTabsBar}
      layoutDirection={"rtl"}
      screenOptions={{ ...screenOptions }}
    >
      <TopTabs.Screen name="followers" options={{ title: t("followers") }} />
      <TopTabs.Screen name="following" options={{ title: t("following") }} />
    </TopTabs>
  );
};

export default FriendsLayout;
