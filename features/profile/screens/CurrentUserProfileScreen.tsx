import { AppBar } from "@/features/navigation/components/AppBar";
import { BaseUser } from "@/types/user.types";
import Page from "@components/Page";
import ReputationInfo from "@components/ReputationInfo";
import ScrollPage from "@components/ScrollPage";
import { ContainerView } from "@components/styled";
import { ThemedText } from "@components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React, { useMemo } from "react";
import { View, ViewProps } from "react-native";
import { Divider, TextProps, TouchableRipple } from "react-native-paper";
import { useTheme } from "react-native-paper/src/core/theming";
import { StyleSheet } from "react-native";
import NavigationButtonsList from "../components/NavigationButtonsList";
import { MotiView } from "moti";
import { useAuthSession } from "@features/auth/store";
import PlaceholderPage from "@components/PlaceholderPage";
import ServerView from "@components/ServerView";
import useProfile from "../hooks/useProfile";
import { AuthUser } from "@features/auth/types";
import { Image } from "expo-image";

type CurrentUserProfileScreenProps = { id: BaseUser["id"] } & ViewProps;

const CurrentUserProfileScreen = ({
  id,
  ...props
}: CurrentUserProfileScreenProps) => {
  const theme = useTheme();
  const user = useAuthSession((state) => state.session?.user);
  return (
    <Page>
      <AppBar divider backAction={false} title={t("profile")} />
      <ScrollPage
        contentContainerStyle={{ paddingBottom: 20 }}
        overScrollMode="auto"
      >
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Image
            style={{
              height: 140,
              width: "95%",
              backgroundColor: "#333",
              borderWidth: 2,
              borderColor: "gray",
              borderRadius: 10,
            }}
            source={user?.profile.background}
          />
          <Image
            style={{
              height: 120,
              width: 120,
              marginTop: -25,
              borderWidth: 2,
              borderColor: "gray",
              backgroundColor: "gray",
              borderRadius: 100,
            }}
            source={user?.profile_picture}
            transition={500}
          />

          <View style={{ gap: 5, marginTop: 6, alignItems: "center" }}>
            {/* display name */}
            <View style={{ alignItems: "center" }}>
              <ThemedText bold variant="titleLarge">
                {user?.display_name ? user.display_name : user?.full_name}
              </ThemedText>

              {/* Username */}
              <ThemedText bold variant="bodySmall">
                @{user?.username}
              </ThemedText>
            </View>

            <View style={{ alignItems: "center" }}>
              {/* real name */}
              <ThemedText color="gray" variant="labelLarge">
                {user?.full_name}
              </ThemedText>

              {/* Email */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Ionicons color={theme.colors.secondary} name="mail" />
                <ThemedText variant="labelSmall">{user?.email}</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* extra  info */}
        <ContainerView style={{ marginTop: 20, gap: 12 }}>
          {/* Biography */}
          {user?.profile.biography && (
            <ThemedText color="#333" variant="bodyMedium">
              {user?.profile.biography}
            </ThemedText>
          )}
          <CurrentUserReputation userPk={user?.pk} />
        </ContainerView>
        {/* Navigation pages ( Drawer replacement ) */}
        <ContainerView style={{ marginTop: 30, gap: 8 }}>
          <Divider bold />
          <NavigationButtons />
        </ContainerView>
      </ScrollPage>
    </Page>
  );
};

/**
 * Fetch user reputation from server,
 *
 * @param userPk: CurrentUserReputation
 * @returns
 */
function CurrentUserReputation({ userPk }: { userPk: AuthUser["pk"] }) {
  const q = useProfile(userPk);
  return (
    <ServerView status={q.status}>
      <ReputationInfo
        reach={q.data?.reach ?? 0}
        views={q.data?.total_views ?? 0}
        reputation={q.data?.reputation ?? 0}
      />
    </ServerView>
  );
}

function NavigationButtons(props: ViewProps) {
  const buttons = useMemo(
    () => [
      {
        path: "friends",
        icon: "people",
        label: "Friends",
      },
      {
        path: "watch_history",
        icon: "time-outline",
        label: "Watch history",
      },
      {
        path: "blacklist",
        icon: "list",
        label: "Blacklist",
      },
      {
        path: "bookmarks",
        icon: "bookmark-outline",
        label: "Bookmark questions",
      },
      {
        path: "following_requests_from_me",
        icon: "send",
        label: "Your following requests",
      },
      {
        path: "following_requests_to_me",
        icon: "pulse",
        label: "Following requests to you",
      },
      {
        path: "settings",
        icon: "settings",
        label: "Settings",
      },
    ],
    []
  );

  return (
    <View {...props}>
      <NavigationButtonsList style={{ gap: 10 }} items={buttons} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageOptionButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 14,
    justifyContent: "center",
  },
});

export default CurrentUserProfileScreen;
