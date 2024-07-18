import LoadingDialog from "@/components/LoadingDialog";
import BottomTabNavigationBar from "@/components/navigation/BottomNavigationBar";
import TabBarIcon from "@/components/navigation/TabBarIcon";
import { LOGIN_PAGE } from "@/constants/routes";
import { useSession } from "@/hooks/useSession";
import { Redirect, Tabs } from "expo-router";

export default function ProtectedLayout() {
  const { session, isLoading } = useSession();

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
      screenOptions={{ headerShown: false }}
      tabBar={BottomTabNavigationBar}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "الرئيسية",
          tabBarIcon: (props) => <TabBarIcon {...props} icon_name={"home"} />,
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: "الإشعارات",
          tabBarIcon: (props) => <TabBarIcon {...props} icon_name="bell" />,
        }}
      />
      <Tabs.Screen
        name="leader_board"
        options={{
          tabBarLabel: "الجوائز",
          tabBarIcon: (props) => <TabBarIcon {...props} icon_name="star" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "انت",
          tabBarIcon: (props) => <TabBarIcon {...props} icon_name="account" />,
        }}
      />
    </Tabs>
  );
}
