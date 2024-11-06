import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FollowingRequest } from "../types";
import { Button, Surface, useTheme } from "react-native-paper";
import UserAvatar from "@/components/UserAvatar";
import { School } from "./UserCompactCell";
import Row from "@/components/Row";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { containerMargins } from "@/constants/styels";
import { t } from "i18next";
import useAcceptFollowingRequestMutation from "../hooks/useAcceptFollowingRequestMutation";

type FollowingRequestsToMeCellProps = {
  request: FollowingRequest;
};

const FollowingRequestsToMeCell = ({
  request,
}: FollowingRequestsToMeCellProps) => {
  const router = useRouter();

  const goToUser = () => {
    router.push(`/users/${request.from_user.username}`);
  };

  return (
    <Surface mode="flat" style={[styles.container]}>
      <ThemedView style={{ padding: 10, gap: 16 }}>
        <Row style={{ justifyContent: "space-between" }}>
          <ThemedView
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <UserAvatar url={request.from_user.profile_picture} size={60} />
            <ThemedView style={{ gap: 5 }}>
              <ThemedText onPress={goToUser}>
                {request.from_user.short_name}
              </ThemedText>
              <School name={request.from_user.school_name} />
            </ThemedView>
          </ThemedView>
          <ThemedText variant="labelSmall" style={{ marginTop: 10 }}>
            {request.created.toLocaleDateString()}
          </ThemedText>
        </Row>
        <ActionButtons requestId={request.id} />
      </ThemedView>
    </Surface>
  );
};

type ActionButtonsProps = { requestId: FollowingRequest["id"] };

export const ActionButtons = (props: ActionButtonsProps) => {
  return (
    <Row style={{ gap: 8 }}>
      <AcceptButton {...props} />
      <RejectButton {...props} />
    </Row>
  );
};

export const AcceptButton = ({ requestId }: ActionButtonsProps) => {
  const { mutate: accept, isPending } = useAcceptFollowingRequestMutation();

  return (
    <Button
      disabled={isPending}
      onPress={() => {
        accept(requestId);
      }}
    >
      {t("accept")}
    </Button>
  );
};

export const RejectButton = ({ requestId }: ActionButtonsProps) => {
  const theme = useTheme();
  return (
    <Button
      theme={{ colors: { primary: theme.colors.error } }}
      onPress={() => alert("reject")}
    >
      {t("reject")}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    ...containerMargins,
    borderRadius: 6,
    marginBottom: 10,
    gap: 10,
  },
});

export default FollowingRequestsToMeCell;
