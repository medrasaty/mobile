import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BaseUser } from "@/types/user.types";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { useMemo } from "react";
import UserAvatar from "@/components/UserAvatar";
import { Link, router } from "expo-router";
import Row from "@/components/Row";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { FriendUser } from "../types";
import {
  FollowBack,
  FollowButton,
  UnfollowButton,
} from "./FollowActionButtons";

type UserCompactCellProps = {
  user: FriendUser;
};

const UserCompactCell = ({ user }: UserCompactCellProps) => {
  const goToUser = () => {
    router.push(`/users/${user.username}`);
  };

  return (
    <ThemedView style={{ padding: DEFAULT_CONTAINER_SPACING }}>
      <ThemedView style={styles.rowContainer}>
        <Row alignItems="center" style={{ gap: 10 }}>
          <UserAvatar size={60} url={user.profile_picture} />
          <Pressable onPress={goToUser}>
            <ThemedText>{user.short_name}</ThemedText>
            <School name={user.school_name} />
          </Pressable>
        </Row>

        <ActionButton
          isFollower={user.is_follower}
          isFollowing={user.is_following}
          username={user.username}
        />
      </ThemedView>
    </ThemedView>
  );
};

const DisplayName = ({ name }: { name: string }) => {
  return (
    <ThemedText numberOfLines={1} variant="bodyLarge">
      {name}
    </ThemedText>
  );
};

const Username = ({ username }: { username: string }) => {
  return <ThemedText variant="labelSmall">@{username}</ThemedText>;
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
      <ThemedText
        color="gray"
        style={{ width: 100 }}
        numberOfLines={1}
        variant="labelSmall"
      >
        {name}
      </ThemedText>
    </Row>
  );
};

type ActionButtonProps = {
  username: BaseUser["username"];
  isFollower: boolean;
  isFollowing: boolean;
};

const ActionButton = ({
  username,
  isFollower,
  isFollowing,
}: ActionButtonProps) => {
  if (isFollowing) {
    return <UnfollowButton username={username} />;
  }

  if (isFollower) {
    return <FollowBack username={username} />;
  }

  return <FollowButton username={username} />;
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
