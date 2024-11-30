import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BaseUser } from "@/types/user.types";
import { Pressable, StyleSheet } from "react-native";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import UserAvatar from "@/components/UserAvatar";
import { router } from "expo-router";
import Row from "@/components/Row";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { FriendUser } from "../types";
import {
  FollowBack,
  FollowButton,
  UnfollowButton,
} from "./FollowActionButtons";
import { path } from "@/lib/routing";
import UserInfo from "@components/UserInfo";

type UserCompactCellProps = {
  user: FriendUser;
};

const UserCompactCell = ({ user }: UserCompactCellProps) => {
  const goToUser = () => {
    router.push(path.users.details(user.id));
  };

  return (
    <ThemedView style={{ padding: DEFAULT_CONTAINER_SPACING }}>
      <ThemedView style={styles.rowContainer}>
        <UserInfo user={user} />
        <ActionButton
          isFollower={user.is_follower}
          isFollowing={user.is_following}
          pk={user.pk}
        />
      </ThemedView>
    </ThemedView>
  );
};

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

type ActionButtonProps = {
  pk: BaseUser["pk"];
  isFollower: boolean;
  isFollowing: boolean;
};

const ActionButton = ({ pk, isFollower, isFollowing }: ActionButtonProps) => {
  console.log("ActionButton");
  console.log(pk);

  if (isFollowing) {
    return <UnfollowButton pk={pk} />;
  }

  if (isFollower) {
    return <FollowBack pk={pk} />;
  }

  return <FollowButton pk={pk} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    height: 190,
  },

  infoContainer: {
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default UserCompactCell;
