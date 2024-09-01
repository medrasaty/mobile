import { ProfilePicture } from "@/components/Avatar";
import { ThemedText } from "@/components/ThemedText";
import UserVerificationBadge from "@/components/UserVerificationBadge";
import Username from "@/components/Username";
import { BaseUser } from "@/types/user.types";
import { View } from "react-native";

export const User = ({
  user,
  squarePicture,
}: {
  user: BaseUser;
  squarePicture?: boolean;
}) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <ProfilePicture
        square={squarePicture}
        size={30}
        source={user.profile_picture}
      />

      <View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Username
            name={user.short_name}
            username={user.username}
            variant="labelMedium"
          />
          <UserVerificationBadge userType={user.type} />
        </View>
        <ThemedText color="gray" variant="labelSmall">
          {user.school_name}
        </ThemedText>
      </View>
    </View>
  );
};

export default User;
