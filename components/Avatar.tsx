import { Image, ImageProps } from "expo-image";
import View from "@/components/styled/View";
import { API_URL } from "@/constants";
import { useTheme } from "react-native-paper";
import FastImage, { FastImageProps, Source } from "react-native-fast-image";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export type AvatarProps = {
  size?: number;
  dense?: boolean;
  source: Source["uri"];
  square?: boolean;
} & FastImageProps;

export const AVATAR_SIZE = 64;
export const DENSE_AVATAR_SIZE = 52;

export default function Avatar({
  size,
  dense = false,
  square = false,
  source,
  ...props
}: AvatarProps) {
  const theme = useTheme();
  const styles = useMemo(() => {
    const borderRadius = square === true ? 0 : 100;
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: borderRadius,
      },
      image: {
        width: size,
        height: size,
        borderRadius: borderRadius,
      },
    });
  }, [size, square]);

  return (
    <View style={styles.container}>
      <FastImage style={styles.image} source={{ uri: source }} {...props} />
    </View>
  );
}

export function ProfilePicture({ ...props }: AvatarProps) {
  return <Avatar {...props} />;
}
