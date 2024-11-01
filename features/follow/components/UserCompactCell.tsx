import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BaseUser } from "@/types/user.types";
import { StyleSheet, useWindowDimensions } from "react-native";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { useMemo } from "react";
import UserAvatar from "@/components/UserAvatar";
import { Link } from "expo-router";

type UserCompactCellProps = {
  user: BaseUser;
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
          <ThemedText numberOfLines={1} variant="bodySmall">
            {user.short_name}
          </ThemedText>
          <ThemedText variant="labelSmall">@{user.username}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: "center",
  },

  infoContainer: {
    alignItems: "center",
  },
});

export default UserCompactCell;
