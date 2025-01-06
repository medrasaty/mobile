import { SafeAreaView } from "@/components/styled";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AppBar } from "@/features/navigation/components/AppBar";
import MaterialDrawerItemList from "@/features/navigation/components/MaterialDrawerItemList";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerHeaderProps,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";
import "react-native-gesture-handler";
import { Appbar, Drawer as MaterialDrawer, useTheme } from "react-native-paper";

export const MaterialDrawerContent = (props: DrawerContentComponentProps) => {
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView>
      <DrawerContentScrollView
        style={{ height }}
        {...props}
        scrollEnabled={false}
      >
        <MaterialDrawer.Section>
          <MaterialDrawerItemList {...props} />
        </MaterialDrawer.Section>
      </DrawerContentScrollView>
      <DrawerFooter />
    </SafeAreaView>
  );
};

export const DrawerFooter = () => {
  return (
    <ThemedView
      style={{
        position: "absolute",
        bottom: 0,
        left: 90,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>DrawerFooter</ThemedText>
    </ThemedView>
  );
};
export default function DrawerLayout() {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const theme = useTheme();

  return (
    <Drawer
      screenOptions={{
        drawerItemStyle: {
          marginTop: 10,
          marginBottom: 10,
        },
        drawerLabelStyle: {
          color: theme.colors.onBackground,
        },
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },

        header: DrawerPagesAppbar,
      }}
      initialRouteName="(tabs)"
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: t("Home"),
          drawerIcon: HomeIcon,
        }}
      />
      <Drawer.Screen
        options={{
          title: t("Bookmarks"),
          drawerIcon: BookmarksIcon,
        }}
        name="bookmarks"
      />
      <Drawer.Screen
        name="friends"
        options={{
          title: t("Friends"),
          drawerIcon: FriendsIcon,
        }}
      />
      <Drawer.Screen
        redirect={!user.is_private}
        name="following_requests_to_me"
        options={{
          title: t("Following_requests"),
          drawerIcon: FollowingRequestsIcon,
        }}
      />
      <Drawer.Screen
        name="following_requests_from_me"
        options={{
          title: t("Your_following_requests"),
          drawerIcon: YourFollowingRequestsIcon,
        }}
      />
      <Drawer.Screen
        name="blacklist"
        options={{
          headerShown: false,
          title: t("Black_list"),
          drawerIcon: BlackListIcon,
        }}
      />
      <Drawer.Screen
        name="watch_history"
        options={{
          headerShown: false,
          title: t("Watch_history"),
          drawerIcon: HistoryIcon,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          headerShown: false,
          title: t("Settings"),
          drawerIcon: SettingsIcon,
        }}
      />
    </Drawer>
  );
}

export const DrawerPagesAppbar = (props: DrawerHeaderProps) => {
  return (
    <AppBar title={props.options.title}>
      <Appbar.Action icon={"dots-vertical"} onPress={() => {}} />
    </AppBar>
  );
};

type IconProps = {
  color: string;
  size: number;
  focused: boolean;
};

const HomeIcon = (props: IconProps) => {
  return <Ionicons name="home-outline" {...props} />;
};

const BookmarksIcon = (props: IconProps) => {
  return <Ionicons name="bookmark-outline" {...props} />;
};

const FriendsIcon = (props: IconProps) => {
  return <Ionicons name="people-outline" {...props} />;
};

const FollowingRequestsIcon = (props: IconProps) => {
  return <MaterialCommunityIcons name="mapbox" {...props} />;
};

const YourFollowingRequestsIcon = (props: IconProps) => {
  return <Ionicons name="send" {...props} />;
};

const BlackListIcon = (props: IconProps) => {
  // TODO: choose better icon
  return <Ionicons name="code-working" {...props} />;
};

const HistoryIcon = (props: IconProps) => {
  // TODO: choose better icon
  return <Ionicons name="time-outline" {...props} />;
};

const SettingsIcon = (props: IconProps) => {
  // TODO: choose better icon
  return <Ionicons name="settings-outline" {...props} />;
};
