import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

type UserInfoProps = {
  name: string;
  username: string;
  schoolName: string;
  avatarUrl: string;
  avatarSize?: number;
};

const UserInfo = ({
  name,
  username,
  schoolName,
  avatarUrl,
  avatarSize = 60,
}: UserInfoProps) => {
  const router = useRouter();
  const gotToUser = () => {
    router.push(`/users/${username}/detail`);
  };

  return (
    <ThemedView style={styles.container}>
      <UserAvatar url={avatarUrl} size={avatarSize} />
      <Pressable onPress={gotToUser} style={{ gap: 5 }}>
        <ThemedText>{name}</ThemedText>
        <School name={schoolName} />
      </Pressable>
    </ThemedView>
  );
};

import { Pressable, StyleSheet } from "react-native";
import UserAvatar from "./UserAvatar";
import { School } from "@/features/friendship/components/UserCompactCell";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default UserInfo;
