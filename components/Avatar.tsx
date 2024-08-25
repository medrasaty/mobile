import { Image, ImageProps } from "expo-image";
import View from "@/components/styled/View";

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
  ...props
}: AvatarProps) {
  const borderRadius = square === true ? 0 : 100;
  return (
    <View>
      <Image
        style={{ width: size, height: size, borderRadius: borderRadius }}
        {...props}
      />
    </View>
  );
}

export function ProfilePicture({ ...props }: AvatarProps) {
  const profilePlaceholder = require("@/assets/images/icon.png");
  return <Avatar placeholder={profilePlaceholder} {...props} />;
}
