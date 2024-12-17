import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import { UserProfile } from "../types";
import ProfileInfo from "./ProfileInfo";

type ProfileBackgroundImageProps = {
  background: UserProfile["profile"]["background"];
} & ViewProps;

const DEFAULT_BACKGROUND_IMAGE_HEIGHT = 170;

export const ProfileBackgroundImage = ({
  background,
  style,
  ...props
}: ProfileBackgroundImageProps) => {
  const styles = useProfileBackgroundStyle();

  return (
    <ThemedView style={[style, styles.container]} {...props}>
      <Image
        contentFit="cover"
        transition={0}
        cachePolicy={"memory"}
        source={{ uri: background }}
        style={styles.image}
      />
      <Divider />
    </ThemedView>
  );
};

function useProfileBackgroundStyle() {
  const theme = useTheme();
  return useMemo(() => {
    return StyleSheet.create({
      container: {
        marginTop: 3,
        backgroundColor: theme.colors.surface,
        alignItems: "center",
      },
      image: {
        borderWidth: 1,
        borderColor: theme.colors.surfaceVariant,
        width: "96%",
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

const ProfileHeader = ({ profile }: { profile: UserProfile }) => {
  return (
    <ThemedView>
      <ProfileBackgroundImage background={profile.profile.background} />
      <ProfileInfo profile={profile} />
    </ThemedView>
  );
};

export default ProfileHeader;
