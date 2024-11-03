import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BaseUser } from "@/types/user.types";
import { StyleSheet, useWindowDimensions } from "react-native";
import { DEFAULT_CONTAINER_SPACING, debugStyle } from "@/constants/styels";
import { useMemo } from "react";
import UserAvatar from "@/components/UserAvatar";
import { Link } from "expo-router";
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
  const { width } = useWindowDimensions();

  const numOfCells = 3;
  const cardWidth = useMemo(
    () => (width - 2 * DEFAULT_CONTAINER_SPACING) / numOfCells,
    [width]
  );

  return (
    <Link href={`/users/${user.username}`}>
      <ThemedView style={[styles.container, { width: cardWidth }]}>
        <UserAvatar url={user.profile_picture} size={80} />
        <ThemedView style={styles.infoContainer}>
          <DisplayName name={user.short_name} />
          <School name={user.school_name} />
        </ThemedView>
        <ActionButton
          username={user.username}
          isFollower={user.is_follower}
          isFollowing={user.is_following}
        />
      </ThemedView>
    </Link>
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
      <ThemedText color="gray" numberOfLines={1} variant="labelSmall">
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
    gap: 10,
    alignItems: "center",
    height: 190,
  },

  infoContainer: {
    alignItems: "center",
  },
});

export default UserCompactCell;
