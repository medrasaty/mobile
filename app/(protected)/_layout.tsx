import { useSession } from "@/auth/ctx";
import LoadingDialog from "@/components/LoadingDialog";
import { Tabs, router } from "expo-router";
import BottomTabNavigationBar from "@/components/navigation/BottomNavigationBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabBarIcon from "@/components/navigation/TabBarIcon";
import { Text, useTheme } from "react-native-paper";
import { LOGIN_PAGE } from "@/constants/routes";

export default function ProtectedLayout() {
  const { session, isLoading } = useSession();
  const theme = useTheme();

  if (isLoading) {
    return <LoadingDialog visible={isLoading} />;
  }

  if (!session) {
    router.replace(LOGIN_PAGE);
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={BottomTabNavigationBar}
    >
      <Tabs.Screen
        name="home"
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
