import { Image, ImageProps } from "expo-image";
import View from "@/components/styled/View";

export type AvatarProps = ImageProps & {
  size?: number;
};

export const DEFAULT_AVATAR_SIZE = 64;

export default function Avatar({
  size = DEFAULT_AVATAR_SIZE,
  ...props
}: AvatarProps) {
  return (
    <View>
      <Image
        style={{ width: size, height: size, borderRadius: 100 }}
        {...props}
      />
    </View>
  );
}

export function ProfilePicture({ ...props }: AvatarProps) {
  const profilePlaceholder = require("@/assets/images/icon.png");
  return <Avatar placeholder={profilePlaceholder} {...props} />;
}
