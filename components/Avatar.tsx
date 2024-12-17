import { Image, ImageProps } from "expo-image";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export type AvatarProps = {
  size?: number;
  url?: string;
  square?: boolean;
} & ImageProps;

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
    <Image
     contentFit="cover"
      style={[style, styles.image]}
      source={{ uri: url }}
      {...props}
    />
  );
}
