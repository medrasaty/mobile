import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { FollowingRequest } from "../types";
import { StyleSheet } from "react-native";
import { Chip, IconButton, useTheme } from "react-native-paper";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { t } from "i18next";
import { FollowingRequestStatusType } from "@/features/profile/types";
import Row from "@/components/Row";
import { ConfirmDialogV2 } from "@/components/ConfirmDialog";
import { useVisibleV2 } from "@/hooks/useVisible";
import { Ionicons } from "@expo/vector-icons";
import useDeleteFollowingRequestMutation from "../hooks/useDeleteFollowingRequestMutaiton";
import LoadingDialog from "@/components/LoadingDialog";
import { router } from "expo-router";
import UserInfo from "@components/UserInfo";
import { path } from "@/lib/routing";

const FollowingRequestCell = ({ request }: { request: FollowingRequest }) => {
  return (
    <ThemedView style={[styles.container]}>
      <ThemedView style={styles.rowContainer}>
        <UserInfo user={request.to_user} />
        <Row alignItems="center">
          <Status status={request.status} />
          <DeleteRequest requestId={request.id} />
        </Row>
      </ThemedView>
    </ThemedView>
  );
};

export const Status = ({ status }: { status: FollowingRequestStatusType }) => {
  // TODO: Style chip differently based on status ( success: green, rejected: red, etc)

  return (
    <Chip compact mode="flat">
      {t(status)}
    </Chip>
  );
};

export const DeleteRequest = ({
  requestId,
}: {
  requestId: FollowingRequest["id"];
}) => {
  const [confirmVisible, showConfirm, hideConfirm] = useVisibleV2(false);
  const { mutate: deleteRequest, isPending } =
    useDeleteFollowingRequestMutation();
  const theme = useTheme();

  const handleDeletionConfirm = () => {
    hideConfirm();
    deleteRequest(requestId);
  };

  return (
    <>
      <IconButton
        iconColor={theme.colors.error}
        disabled={isPending}
        onPress={() => showConfirm()}
        icon={() => (
          <Ionicons size={24} color={theme.colors.error} name="trash-outline" />
        )}
      />
      <ConfirmDialogV2
        visible={confirmVisible}
        onCancel={hideConfirm}
        onConfirm={handleDeletionConfirm}
        message={t("confirm_following_request_deletion")}
      />
      <LoadingDialog visible={isPending} message="deleting..." />
    </>
  );
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
