import ReputationInfo from "@/components/ReputationInfo";
import Row from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { memo, useMemo, useEffect } from "react";
import { StyleSheet, View, ViewProps, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { UserProfile } from "../types";
import ProfileActionsSection from "./ProfileFollowingSection";
import Biography from "./Biography";
import { debugStyle } from "@/constants/styels";

type ProfileInfoProps = {
  profile: UserProfile;
} & ViewProps;

/**
 * Optimized profile image component with stable caching
 */
const OptimizedProfileImage = memo(({ url }: { url: string | undefined }) => {
  const styles = useProfilePictureStyle();
  const theme = useTheme();

  // Generate a stable cache key using a frozen string
  const cacheKey = useMemo(() => `profile-image-${url || "default"}`, [url]);

  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 100,
          borderWidth: 2,
          borderColor: theme.colors.secondaryContainer,
        }}
      >
        <Image
          contentFit="cover"
          source={{ uri: url }}
          style={styles.image}
          cachePolicy="memory-disk"
          recyclingKey={cacheKey}
          transition={300}
          placeholder={{
            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
          }}
        />
      </View>
    </View>
  );
});

// Memoize the entire ProfileInfo component to prevent unnecessary rerenders
const ProfileInfo = memo(({ profile, style, ...props }: ProfileInfoProps) => {
  // Ensure profile data is valid before rendering
  if (!profile) {
    console.warn("ProfileInfo: No profile data provided");
    return <ThemedText>No profile data available</ThemedText>;
  }

  // Safely extract biography with fallback
  const biography = profile.profile?.biography || "";

  return (
    <ThemedView style={[style, styles.container]} {...props}>
      <Row>
        <OptimizedProfileImage url={profile.thumbnail} />
        <View style={styles.actionSection}>
          <ProfileActionsSection profile={profile} />
        </View>
      </Row>

      {/* User information section with improved styling */}
      <View style={styles.userInfoContainer}>
        {profile.full_name && (
          <ThemedText bold variant="titleLarge" style={styles.nameText}>
            {profile.full_name}
          </ThemedText>
        )}

        {profile.username && (
          <ThemedText variant="bodyMedium" style={styles.usernameText}>
            @{profile.username}
          </ThemedText>
        )}

        {profile.school_name && (
          <Row alignItems="center" style={styles.schoolRow}>
            <MaterialCommunityIcons
              size={18}
              name="school"
              color={useTheme().colors.primary}
            />
            <Link href={`/schools/${profile.school}/detail`}>
              <ThemedText variant="bodyMedium" style={styles.schoolText}>
                {profile.school_name}
              </ThemedText>
            </Link>
          </Row>
        )}

        {biography && (
          <View style={styles.biographyContainer}>
            <Biography>{biography}</Biography>
          </View>
        )}
      </View>

      {/* Reputation info */}
      <ReputationInfo
        style={styles.reputationInfo}
        reputation={profile.reputation || 0}
        reach={profile.reach || 0}
        views={profile.total_views || 0}
      />
    </ThemedView>
  );
});

export function useProfilePictureStyle() {
  const theme = useTheme();
  const AVATAR_SIZE = 120;
  const marginTopFactor = 0.4;
  return useMemo(() => {
    return StyleSheet.create({
      container: {
        marginTop: -AVATAR_SIZE * marginTopFactor,
      },
      image: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderColor: theme.colors.secondaryContainer,
        backgroundColor: theme.colors.secondary,
        shadowColor: theme.colors.shadow,
        elevation: 10,
      },
    });
  }, [theme]);
}

export default ProfileInfo;

const statsInfoContainerMargins = 10;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  actionSection: {
    flex: 1,
  },
  reputationInfo: {
    marginTop: statsInfoContainerMargins,
    marginBottom: statsInfoContainerMargins,
  },
  userInfoContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: "transparent",
  },
  nameText: {
    fontSize: 20,
    marginBottom: 2,
  },
  usernameText: {
    marginBottom: 4,
    opacity: 0.7,
  },
  schoolRow: {
    marginVertical: 4,
    gap: 6,
  },
  schoolText: {
    marginLeft: 4,
  },
  biographyContainer: {
    marginTop: 10,
  },
});
