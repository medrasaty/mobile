import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useMemo } from "react";
import { FollowingRequest } from "../types";
import { StyleSheet } from "react-native";
import { Button, Chip, IconButton, useTheme } from "react-native-paper";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import UserAvatar from "@/components/UserAvatar";
import { School } from "./UserCompactCell";
import { t } from "i18next";
import { FollowingRequestStatusType } from "@/features/profile/types.types";
import Row from "@/components/Row";

function useFollowingRequestStatusColor(status: FollowingRequestStatusType) {
  const theme = useTheme();

  switch (status) {
    case "accepted":
      return "#00ff00";

    case "rejected":
      return "#ff0000";

    case "pending":
      return "#0000ff";

    default:
      return theme.colors.surface;
  }
}

const FollowingRequestCell = ({ request }: { request: FollowingRequest }) => {
  return (
    <ThemedView style={[styles.container]}>
      <ThemedView style={styles.rowContainer}>
        <ThemedView
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <UserAvatar url={request.to_user.profile_picture} size={60} />
          <ThemedView style={{ gap: 5 }}>
            <ThemedText>{request.to_user.short_name}</ThemedText>
            <School name={request.to_user.school_name} />
          </ThemedView>
        </ThemedView>

        <Row alignItems="center">
          <Status status={request.status} />
          <Options />
        </Row>
      </ThemedView>
    </ThemedView>
  );
};

export const Status = ({ status }: { status: FollowingRequestStatusType }) => {
  const color = useFollowingRequestStatusColor(status);
  return <Button mode="contained-tonal">{t(status)}</Button>;
};

export const Options = () => {
  return <IconButton icon={"dots-vertical"} onPress={() => {}} />;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: DEFAULT_CONTAINER_SPACING,
    paddingBottom: DEFAULT_CONTAINER_SPACING,
    paddingLeft: DEFAULT_CONTAINER_SPACING,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default FollowingRequestCell;
