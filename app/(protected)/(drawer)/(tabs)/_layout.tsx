import LoadingDialog from "@/components/LoadingDialog";
import { LOGIN_PAGE } from "@/constants/routes";
import { IndexAppBar } from "@/features/navigation/components/AppBar";
import BottomTabNavigationBar from "@/features/navigation/components/BottomNavigationBar";
import TabBarIcon, {
  NotificationsTabBarIcon,
} from "@/features/navigation/components/TabBarIcon";
import { useSession } from "@/hooks/useSession";
import { Redirect, Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

export default function TabsLayout() {
  const { session, isLoading } = useSession();
  const { t } = useTranslation();

  if (isLoading) {
    return <LoadingDialog visible={isLoading} />;
  }

  // Redirect to login page if not logged in.
  if (session === null) {
    return <Redirect href={LOGIN_PAGE} />;
  }

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        // TODO: set custom AppBar here
        headerShown: false,
      }}
      tabBar={BottomTabNavigationBar}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          header: (props) => {
            return <IndexAppBar title={t("Home")} />;
          },
          tabBarLabel: t("Home"),
          tabBarIcon: (props) => <TabBarIcon {...props} icon_name={"home"} />,
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: t("notification"),
          tabBarIcon: (props) => (
            <NotificationsTabBarIcon {...props} icon_name="bell" />
          ),
        }}
      />
      <Tabs.Screen
        name="leader_board"
        options={{
          tabBarLabel: t("Leaderboard"),
          tabBarIcon: (props) => <TabBarIcon {...props} icon_name="star" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: t("You"),
          tabBarIcon: (props) => <TabBarIcon {...props} icon_name="account" />,
        }}
      />
    </Tabs>
  );
}
