import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BaseUser } from "@/types/user.types";
import { MaterialIcons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { useMemo } from "react";
import { View, ViewProps } from "react-native";
import FastImage, { FastImageProps } from "react-native-fast-image";
import { IconButtonProps, useTheme } from "react-native-paper";

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
  imageStyle?: FastImageProps["style"];
  borderColor?: string;
  badge?: IconProps<any>["name"];
} & ViewProps;

export const UserAvatarV2 = ({
  user,
  size,
  imageStyle,
  borderColor,
  badge = "verified",
  ...props
}: UserAvatarV2Props) => {
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
  }, [size, theme, borderColor]);
  return (
    <View
      style={{
        borderWidth: 4,
        borderColor: borderColor ?? theme.colors.surfaceVariant,
        borderRadius: 100,
        overflow: "hidden",
      }}
      {...props}
    >
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri: user.profile_picture }}
        style={[
          imageStyle,
          {
            width: size,
            height: size,
            borderRadius: 100,
          },
        ]}
      />
      <MaterialIcons
        style={badgeStyle}
        size={badgeSize}
        color={theme.colors.primary}
        name={badge}
      />
    </View>
  );
};

export default UserAvatar;
