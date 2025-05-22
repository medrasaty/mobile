import { ThemedView } from "@/components/ThemedView";
import { BaseUser } from "@/types/user.types";
import { MaterialIcons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Image, ImageProps } from "expo-image";
import { useMemo } from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";

type UserAvatarProps = {
  url: BaseUser["profile_picture"];
  size: number;
  style?: ImageProps["style"];
};

/**
 * @deprecated:{use UserAvatarV2 instead}
 */
const UserAvatar = ({ url, size, style }: UserAvatarProps) => {
  return (
    <ThemedView>
      <Image
        contentFit="cover"
        cachePolicy={"memory"}
        transition={0}
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
  /**
   * The uri of the image to display.
   * If not provided, the avatar will be displayed without an image.
   */
  uri?: string;
  /**
   * The user object containing the thumbnail.
   * @deprecated: use uri instead.
   */
  user?: BaseUser;
  /**
   * Size of the avatar in pixels.
   * The badge size is 10 times smaller than this value.
   */
  size: number;
  /**
   * Style for the image.
   * This is applied to the image inside the avatar.
   */
  imageStyle?: ImageProps["style"];
  /**
   * Color of the border around the avatar.
   * If not provided, it defaults to the theme's surface variant color.
   */
  borderColor?: string;
  /**
   * The name of the icon to display as a badge.
   * This is used to indicate the user's status (e.g., verified).
   */
  badge?: IconProps<any>["name"];
} & ViewProps;

export const UserAvatarV2 = ({
  uri,
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
        borderWidth: 3,
        borderColor: borderColor ?? theme.colors.surfaceVariant,
        borderRadius: 100,
        overflow: "hidden",
      }}
      {...props}
    >
      <Image
        contentFit="cover"
        transition={0}
        cachePolicy={"memory"}
        source={{ uri: uri ? uri : user?.thumbnail }}
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
