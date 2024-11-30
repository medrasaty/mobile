import { useTheme } from "react-native-paper";
import FastImage, { FastImageProps, Source } from "react-native-fast-image";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export type AvatarProps = {
  size?: number;
  url?: Source["uri"];
  square?: boolean;
} & FastImageProps;

export const AVATAR_SIZE = 64;
export const DENSE_AVATAR_SIZE = 52;

export default function Avatar({
  size,
  url,
  square = false,
  source,
  style,
  ...props
}: AvatarProps) {
  const theme = useTheme();
  const styles = useMemo(() => {
    const borderRadius = square === true ? 0 : 100;
    return StyleSheet.create({
      image: {
        width: size,
        height: size,
        borderRadius: borderRadius,
      },
    });
  }, [size, square]);

  return (
    <FastImage
      resizeMode={FastImage.resizeMode.cover}
      style={[style, styles.image]}
      source={{ uri: url }}
      {...props}
    />
  );
}
