import { AppBar } from "@/features/navigation/components/AppBar";
import Page from "@components/Page";
import ReputationInfo from "@components/ReputationInfo";
import ScrollPage from "@components/ScrollPage";
import ServerView from "@components/ServerView";
import { ContainerView } from "@components/styled";
import { ThemedText } from "@components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useAuthSession } from "@features/auth/store";
import { AuthUser } from "@features/auth/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { t } from "i18next";
import React, { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Appbar, Divider, Button } from "react-native-paper";
import { useTheme } from "react-native-paper/src/core/theming";
import NavigationButtonsList from "../components/NavigationButtonsList";
import useProfile from "../hooks/useProfile";
import Biography from "../components/Biography";
import Sheet, { useSheetRef } from "@components/Sheet";
import { useSession } from "@/hooks/useSession";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";

const CurrentUserProfileAppbar: React.FC = () => {
  const router = useRouter();
  return (
    <AppBar divider backAction={false} title={t("Profile")}>
      <Appbar.Action
        icon={(props) => <Ionicons name="settings-outline" {...props} />}
        onPress={() => router.push("settings")}
      />
      <Appbar.Action
        icon={"pencil-outline"}
        onPress={() => router.push("account/edit")}
      />
      {/* more options */}
      <ProfileMoreOptionsAction />
    </AppBar>
  );
};

const ProfileMoreOptionsAction = () => {
  const sheetRef = useSheetRef();
  const { signOut } = useSession();
  const theme = useTheme();
  return (
    <>
      <Appbar.Action
        icon={"dots-vertical"}
        onPress={() => sheetRef.current?.expand()}
      />
      <Sheet ref={sheetRef}>
        <ContainerView style={{ marginBottom: 10 }}>
          <Button
            theme={{ colors: { primary: theme.colors.error } }}
            mode="outlined"
            onPress={signOut}
          >
            logout
          </Button>
        </ContainerView>
      </Sheet>
    </>
  );
};

/**
 * Props for the CurrentUserProfileScreen component
 */
type CurrentUserProfileScreenProps = {
  id: number;
} & ViewProps;

/**
 * CurrentUserProfileScreen - Displays the current user's profile
 *
 * @returns React.ReactElement A screen component with the current user's profile information
 */
const CurrentUserProfileScreen: React.FC<CurrentUserProfileScreenProps> = ({
  id,
  ...props
}: CurrentUserProfileScreenProps) => {
  const theme = useTheme();
  const user = useAuthSession((state) => state.session?.user);

  // Early return if no user is available
  if (!user) {
    return null;
  }

  return (
    <Page {...props}>
      <CurrentUserProfileAppbar />
      <ScrollPage
        contentContainerStyle={styles.scrollContent}
        overScrollMode="auto"
      >
        <View style={styles.profileHeaderContainer}>
          {/* Background Image */}
          <Image
            style={styles.backgroundImage}
            source={user.profile.background}
            cachePolicy="memory-disk"
          />

          {/* Profile Picture */}
          <Image
            style={styles.profilePicture}
            source={user.thumbnail}
            transition={500}
            cachePolicy="memory-disk"
          />

          <View style={styles.nameContainer}>
            {/* Display Name */}
            <View style={styles.centeredView}>
              <ThemedText bold variant="titleLarge">
                {user.display_name ? user.display_name : user.full_name}
              </ThemedText>

              {/* Username */}
              <ThemedText bold variant="bodySmall">
                @{user.username}
              </ThemedText>
            </View>

            <View style={styles.centeredView}>
              {/* Real Name */}
              <ThemedText color="gray" variant="labelLarge">
                {user.full_name}
              </ThemedText>

              {/* Email */}
              <View style={styles.emailContainer}>
                <Ionicons color={theme.colors.secondary} name="mail" />
                <ThemedText variant="labelSmall">{user.email}</ThemedText>
              </View>
            </View>
          </View>
        </View>
        <ContainerView style={{ gap: 10 }}>
          {/* Biography */}
          {user.profile.biography && (
            <Biography>{user.profile.biography}</Biography>
          )}
          <Button
            onPress={() => alert("take these info")}
            mode="contained-tonal"
          >
            more info
          </Button>
        </ContainerView>

        {/* Visually separate between profile info and navigation buttons */}
        <View style={{ margin: DEFAULT_CONTAINER_SPACING }}>
          <Divider />
        </View>

        {/* Pages Navigation */}
        <ContainerView style={styles.navigationContainer}>
          <NavigationButtons />
        </ContainerView>
      </ScrollPage>
    </Page>
  );
};

/**
 * CurrentUserReputation - Fetches and displays the user's reputation information
 *
 * @param {Object} props - Component props
 * @param {number | undefined} props.userPk - The user's primary key
 * @returns {React.ReactElement} A component displaying reputation information
 */
const CurrentUserReputation: React.FC<{ userPk: AuthUser["pk"] }> = React.memo(
  ({ userPk }) => {
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
);

/**
 * NavigationButtons - Displays navigation buttons for different sections
 *
 * @param {ViewProps} props - Component props
 * @returns {React.ReactElement} A component with navigation buttons
 */
const NavigationButtons: React.FC<ViewProps> = React.memo(
  (props: ViewProps) => {
    const user = useAuthSession((state) => state.session?.user);

    const buttons = useMemo(
      () => {
        // Base buttons that are always shown
        const baseButtons = [
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
        ];

        // Only add the following_requests_to_me button if user is private
        if (user?.is_private) {
          baseButtons.push({
            path: "following_requests_to_me",
            icon: "pulse",
            label: "Following requests to you",
          });
        }

        return baseButtons;
      },
      [user?.is_private] // Dependency on user.is_private to recompute when it changes
    );

    return (
      <View {...props}>
        <NavigationButtonsList style={styles.navigationList} items={buttons} />
      </View>
    );
  }
);

// Extract all styles to StyleSheet for better performance and maintainability
const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
    gap: 10,
  },
  profileHeaderContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  backgroundImage: {
    height: 140,
    width: "95%",
    backgroundColor: "#333",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
  },
  profilePicture: {
    height: 120,
    width: 120,
    marginTop: -25,
    borderWidth: 2,
    borderColor: "gray",
    backgroundColor: "gray",
    borderRadius: 100,
  },
  nameContainer: {
    gap: 5,
    marginTop: 6,
    alignItems: "center",
  },
  centeredView: {
    alignItems: "center",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  biographyContainer: {
    gap: 12,
  },
  navigationContainer: {
    gap: 8,
  },
  navigationList: {
    gap: 10,
  },
  pageOptionButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 14,
    justifyContent: "center",
  },
});

export default React.memo(CurrentUserProfileScreen);
