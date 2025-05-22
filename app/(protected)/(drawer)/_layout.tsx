import { AppBar } from "@/features/navigation/components/AppBar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Appbar, useTheme } from "react-native-paper";

export default function DrawerLayout() {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        header: (props) => <AppBar title={props.options.title} />,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
      initialRouteName="(tabs)"
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          title: t("Home"),
        }}
      />
      <Stack.Screen
        options={{
          title: t("Bookmarks"),
        }}
        name="bookmarks"
      />
      <Stack.Screen
        name="friends"
        options={{
          headerShown: true,
          title: t("Friends"),
        }}
      />
      <Stack.Screen
        redirect={!user.profile.is_private}
        name="following_requests_to_me"
        options={{
          title: t("Following_requests"),
        }}
      />
      <Stack.Screen
        name="following_requests_from_me"
        options={{
          title: t("Your_following_requests"),
        }}
      />
      <Stack.Screen
        name="blacklist"
        options={{
          title: t("Black_list"),
        }}
      />
      <Stack.Screen
        name="watch_history"
        options={{
          title: t("Watch_history"),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: t("Settings"),
        }}
      />
    </Stack>
  );
}

export const DrawerPagesAppbar = (props: any) => {
  return (
    <AppBar title={props.options.title}>
      <Appbar.Action icon={"dots-vertical"} onPress={() => {}} />
    </AppBar>
  );
};
