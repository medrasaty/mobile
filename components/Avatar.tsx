import { Image, ImageProps } from "expo-image";
import View from "@/components/styled/View";
import { API_URL } from "@/constants";
import { useTheme } from "react-native-paper";

export type AvatarProps = {
  size?: number;
  dense?: boolean;
  source: ImageProps["source"];
  square?: boolean;
} & ImageProps;

export const AVATAR_SIZE = 64;
export const DENSE_AVATAR_SIZE = 52;

export default function Avatar({
  size,
  dense = false,
  square = false,
  source,
  ...props
}: AvatarProps) {
  const borderRadius = square === true ? 0 : 100;
  const theme = useTheme();
  source = `${API_URL}/media/${source}`; // FIXME: do it better
  return (
    <View
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: borderRadius,
      }}
    >
      <Image
        style={{
          width: size,
          height: size,
          borderRadius: borderRadius,
        }}
        source={source}
        {...props}
      />
    </View>
  );
}

export function ProfilePicture({ ...props }: AvatarProps) {
  return <Avatar {...props} />;
}
