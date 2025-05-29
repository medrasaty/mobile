import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import React, { memo, useMemo } from "react";
import { StyleSheet, View, ViewProps, Text } from "react-native";
import { Button, Divider, useTheme } from "react-native-paper";
import { UserProfile } from "../types";
import ProfileInfo from "./ProfileInfo";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { t } from "i18next";
import { useRouter } from "expo-router";
import { path } from "@/lib/routing";

type ProfileBackgroundImageProps = {
  background: UserProfile["profile"]["background"];
} & ViewProps;

const DEFAULT_BACKGROUND_IMAGE_HEIGHT = 170;

// Optimized background image component with stable caching
export const OptimizedBackgroundImage = memo(
  ({ background }: { background: string | undefined }) => {
    const styles = useProfileBackgroundStyle();

    // Generate a stable cache key using the background URL
    const cacheKey = useMemo(
      () => `bg-${background || "default"}`,
      [background]
    );

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            contentFit="cover"
            transition={300}
            cachePolicy="memory-disk"
            source={{ uri: background }}
            style={styles.image}
            recyclingKey={cacheKey}
            placeholder={
              {
                // uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
              }
            }
          />
        </View>
        <Divider />
      </View>
    );
  }
);

function useProfileBackgroundStyle() {
  const theme = useTheme();
  return useMemo(() => {
    return StyleSheet.create({
      container: {
        marginTop: 3,
        alignItems: "center",
      },
      imageContainer: {
        width: "96%",
        borderRadius: 18,
        backgroundColor: theme.colors.surfaceVariant,
      },
      image: {
        borderWidth: 1,
        borderColor: theme.colors.surfaceVariant,
        height: DEFAULT_BACKGROUND_IMAGE_HEIGHT,
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: 18,
      },
      gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 100,
      },
    });
  }, [theme]);
}

// Memoize the ProfileHeader component to prevent unnecessary rerenders
const ProfileHeader = memo(({ profile }: { profile: UserProfile }) => {
  // Ensure we have valid profile data
  const router = useRouter();
  if (!profile || !profile.profile) {
    console.warn("ProfileHeader: Invalid profile data");
    return (
      <View style={{ padding: 20 }}>
        <Text>Error: Invalid profile data</Text>
      </View>
    );
  }

  const handleMoreInfoPress = () => {
    router.push(path.users.content(profile.id));
  };

  // Safely access the background URL
  const backgroundUrl = profile.profile?.background;

  return (
    <View>
      <OptimizedBackgroundImage background={backgroundUrl} />
      <ProfileInfo profile={profile} />
      <View style={{ padding: DEFAULT_CONTAINER_SPACING }}>
        <Button mode="elevated" onPress={handleMoreInfoPress}>
          {t("more_info")}
        </Button>
      </View>
    </View>
  );
});

export default ProfileHeader;
