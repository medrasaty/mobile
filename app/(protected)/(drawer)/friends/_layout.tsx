import useTopTabsScreenOptions from "@/features/navigation/hooks/useTopTabsScreenOptions";
import TopTabs from "@/features/navigation/layouts/TopTabs";
import { t } from "i18next";

type FriendsLayoutProps = {};

const FriendsLayout = ({}: FriendsLayoutProps) => {
  const screenOptions = useTopTabsScreenOptions();
  return (
    <TopTabs screenOptions={screenOptions}>
      <TopTabs.Screen name="followers" options={{ title: t("followers") }} />
      <TopTabs.Screen name="following" options={{ title: t("following") }} />
    </TopTabs>
  );
};

export default FriendsLayout;
