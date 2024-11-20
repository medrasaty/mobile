import LoadingDialog from "@/components/LoadingDialog";
import { LOGIN_PAGE } from "@/constants/routes";
import { IndexAppBar } from "@/features/navigation/components/AppBar";
import BottomTabNavigationBar from "@/features/navigation/components/BottomNavigationBar";
import TabBarIcon, {
  NotificationsTabBarIcon,
} from "@/features/navigation/components/TabBarIcon";
import { useSession } from "@/hooks/useSession";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

export default function TabsLayout() {
  const { session, isLoading } = useSession();
  const { t } = useTranslation();
  const theme = useTheme();

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
      tabBar={(props) => (
        <BottomTabNavigationBar
          {...props}
          activeLableColor={theme.colors.primary}
          inactiveLableColor={theme.colors.onSurface}
          style={{ backgroundColor: theme.colors.surface }}
        />
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          header: (props) => {
            return <IndexAppBar title={t("Home")} />;
          },
          tabBarLabel: t("Home"),
          tabBarIcon: (props) => (
            <TabBarIcon
              {...props}
              active_icon_name="home"
              icon_name="home-outline"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: t("notification"),
          tabBarIcon: (props) => (
            <NotificationsTabBarIcon
              {...props}
              active_icon_name="bell"
              icon_name="bell-outline"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: t("Search"),
          tabBarIcon: (props) => (
            <Ionicons
              {...props}
              name={props.focused ? "search" : "search-outline"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="exper"
        options={{
          tabBarLabel: t("Exper"),
          tabBarIcon: (props) => (
            <Ionicons
              {...props}
              name={props.focused ? "radio" : "radio-outline"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="schools"
        options={{
          tabBarLabel: t("Schools"),
          tabBarIcon: (props) => (
            <TabBarIcon
              {...props}
              active_icon_name="school"
              icon_name="school-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: t("You"),
          tabBarIcon: (props) => (
            <TabBarIcon
              active_icon_name="account"
              {...props}
              icon_name="account-outline"
            />
          ),
        }}
      />
    </Tabs>
  );
}
