import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { UserProfile } from "../types";
import FastImage from "react-native-fast-image";
import { StyleSheet, View, ViewProps } from "react-native";
import { useMemo } from "react";
import { useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useProfileScreen } from "../contexts/ProfileScreenContext";
import ProfileInfo from "./ProfileInfo";

type ProfileBackgroundImageProps = {} & ViewProps;

const DEFAULT_BACKGROUND_IMAGE_HEIGHT = 200;
const AVATAR_SIZE = 84;

export const ProfileBackgroundImage = ({
  style,
  ...props
}: ProfileBackgroundImageProps) => {
  const {
    profile: { background_picture: url },
  } = useProfileScreen();

  const styles = useProfileBackgroundStyle();

  return (
    <ThemedView style={[style, styles.container]} {...props}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri: url }}
        style={styles.image}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={styles.gradient}
      />
    </ThemedView>
  );
};

function useProfileBackgroundStyle() {
  const theme = useTheme();
  return useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.surface,
      },
      image: {
        width: "100%",
        height: DEFAULT_BACKGROUND_IMAGE_HEIGHT,
      },
      gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 100,
      },
    });
  }, []);
}

const ProfileHeader = () => {
  return (
    <ThemedView>
      <ProfileBackgroundImage />
      <ProfileInfo />
    </ThemedView>
  );
};

export default ProfileHeader;
