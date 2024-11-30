import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { School } from "@/features/friendship/components/UserCompactCell";
import { path } from "@/lib/routing";
import { BaseUser } from "@/types/user.types";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { UserAvatarV2 } from "./UserAvatar";

type UserInfoProps = {
  avatarSize?: number;
  user: BaseUser;
  showSchool?: boolean;
};

const UserInfo = ({
  showSchool = true,
  avatarSize = 60,
  user,
}: UserInfoProps) => {
  const router = useRouter();
  const gotToUser = () => {
    router.push(path.users.details(user.id));
  };

  return (
    <ThemedView style={styles.container}>
      <UserAvatarV2 user={user} size={avatarSize} />
      <Pressable onPress={gotToUser} style={{ gap: 5 }}>
        <ThemedText>{user.short_name}</ThemedText>
        {showSchool && <School name={user.school_name} />}
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default UserInfo;
