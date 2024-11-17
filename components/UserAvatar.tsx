import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BaseUser } from "@/types/user.types";
import { MaterialIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { View, ViewProps } from "react-native";
import FastImage, { FastImageProps } from "react-native-fast-image";
import { useTheme } from "react-native-paper";

type UserAvatarProps = {
  url: BaseUser["profile_picture"];
  size: number;
  style?: FastImageProps["style"];
};

/**
 * @deprecated
 */
const UserAvatar = ({ url, size, style }: UserAvatarProps) => {
  return (
    <ThemedView>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri: url }}
        style={[
          style,
          {
            width: size,
            height: size,
            borderRadius: 100,
          },
        ]}
      />
    </ThemedView>
  );
};

export type UserAvatarV2Props = {
  user: BaseUser;
  size: number;
} & ViewProps;

export const UserAvatarV2 = ({ user, size, ...props }: UserAvatarV2Props) => {
  const theme = useTheme();
  const badgeSize = useMemo(() => {
    return size * 0.2; // 10 times smaller
  }, [size]);
  const badgeStyle = useMemo(() => {
    return {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 100,
      position: "absolute",
      padding: size / 25,
      bottom: size / 13,
      left: size / 13,
    };
  }, [size, theme]);
  return (
    <View style={{ borderRadius: 100, overflow: "hidden" }}>
      <ThemedView>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{ uri: user.profile_picture }}
          style={[
            { borderWidth: 3, borderColor: theme.colors.surfaceVariant },
            {
              width: size,
              height: size,
              borderRadius: 100,
            },
          ]}
        />
      </ThemedView>
      <MaterialIcons
        style={badgeStyle}
        size={badgeSize}
        color={theme.colors.primary}
        name="verified"
      />
    </View>
  );
};

export default UserAvatar;
