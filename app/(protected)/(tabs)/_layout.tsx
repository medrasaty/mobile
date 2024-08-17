import LoadingDialog from "@/components/LoadingDialog";
import { LOGIN_PAGE } from "@/constants/routes";
import { IndexAppBar } from "@/features/navigation/components/AppBar";
import BottomTabNavigationBar from "@/features/navigation/components/BottomNavigationBar";
import TabBarIcon from "@/features/navigation/components/TabBarIcon";
import { useSession } from "@/hooks/useSession";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
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
            return <IndexAppBar title="الأسئلة" />;
          },
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
