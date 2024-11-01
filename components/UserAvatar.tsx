import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BaseUser } from "@/types/user.types";
import FastImage, { FastImageProps } from "react-native-fast-image";

type UserAvatarProps = {
  url: BaseUser["profile_picture"];
  size: number;
  style?: FastImageProps["style"];
};

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

export default UserAvatar;
