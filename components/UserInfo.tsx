/**
 * UserInfo component displays a user's avatar, name, and optionally their school.
 * 
 * Props:
 * - user: BaseUser (required) - The user object containing user details.
 * - avatarSize?: number - The size of the avatar to display (default: 55).
 * - showSchool?: boolean - Whether to show the user's school (default: true).
 * 
 * When pressed, navigates to the user's profile page.
 */

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BaseUser } from "@/types/user.types";
import { Pressable, StyleSheet } from "react-native";
import { UserAvatarV2 } from "./UserAvatar";
import Row from "./Row";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { path } from "@/lib/routing";

type UserInfoProps = {
  avatarSize?: number;
  user: BaseUser;
  showSchool?: boolean;
};

/**
 * Renders a user's avatar, name, and optionally their school.
 * The name and school are pressable and navigate to the user's profile.
 */
const UserInfo = ({
  showSchool = true,
  avatarSize = 55,
  user,
}: UserInfoProps) => {
  return (
    <ThemedView style={styles.container}>
      <UserAvatarV2 user={user} size={avatarSize} />
      <Pressable
        onPress={() => path.users.goToUser(user.id)}
        style={{ gap: 5 }}
      >
        <ThemedText>{user.short_name}</ThemedText>
        {showSchool && <School name={user.school_name} />}
      </Pressable>
    </ThemedView>
  );
};

/**
 * School component displays a school icon and the school name.
 * 
 * Props:
 * - name: string - The name of the school to display.
 */
export const School = ({ name }: { name: string }) => {
  const theme = useTheme();
  return (
    <Row alignItems="center" style={{ gap: 4 }}>
      <MaterialCommunityIcons
        size={18}
        name="school"
        color={theme.colors.primary}
      />
      <ThemedText style={{ width: 100 }} numberOfLines={1} variant="labelSmall">
        {name}
      </ThemedText>
    </Row>
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
