import BottomTabNavigationBar from "@/features/navigation/components/BottomNavigationBar";
import TabBarIcon, {
  NotificationsTabBarIcon,
} from "@/features/navigation/components/TabBarIcon";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

export default function TabsLayout() {
  const { t } = useTranslation();
  const theme = useTheme();

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

      {/* 
      <Tabs.Screen
        name="exper"
        options={{
          tabBarLabel: t("Exper"),
          tabBarIcon: (props) => (
            <TabBarIcon
              active_icon_name="circle"
              {...props}
              icon_name="circle-outline"
            />
          ),
        }}
      />
            */}
    </Tabs>
  );
}
