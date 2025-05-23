import { ConfirmDialogV2 } from "@/components/ConfirmDialog";
import LoadingDialog from "@/components/LoadingDialog";
import Row from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { containerMargins, debugStyle } from "@/constants/styels";
import { useVisibleV2 } from "@/hooks/useVisible";
import { d } from "@/lib/dates";
import UserInfo from "@components/UserInfo";
import { t } from "i18next";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Surface, useTheme } from "react-native-paper";
import useAcceptFollowingRequestMutation from "../hooks/useAcceptFollowingRequestMutation";
import useRejectFollowingRequestMutation from "../hooks/useRejectFollowingRequestMutation";
import { FollowingRequest } from "../types";

type FollowingRequestsToMeCellProps = {
  request: FollowingRequest;
};

const FollowingRequestsToMeCell = ({
  request,
}: FollowingRequestsToMeCellProps) => {
  const theme = useTheme();

  return (
    <Surface elevation={0} style={[styles.container]}>
      <View style={{ gap: 16 }}>
        <Row style={{ justifyContent: "space-between" }}>
          <UserInfo user={request.from_user} />
          <ThemedText
            variant="labelSmall"
            color={theme.colors.secondary}
            style={{ marginTop: 10, marginEnd: 10 }}
          >
            {d(request.created).fromNow()}
          </ThemedText>
        </Row>
        <ActionButtons requestId={request.id} />
      </View>
    </Surface>
  );
};

type ActionButtonsProps = { requestId: FollowingRequest["id"] };

export const ActionButtons = ({ requestId }: ActionButtonsProps) => {
  const { mutate: accept, isPending: isAcceptPending } =
    useAcceptFollowingRequestMutation();
  const { mutate: reject, isPending: isRejectPending } =
    useRejectFollowingRequestMutation();
  const theme = useTheme();
  const [visible, show, hide] = useVisibleV2(false);

  const handleRejectionConfirm = () => {
    hide();
    reject(requestId);
  };

  return (
    <Row style={{ gap: 8, justifyContent: "flex-end" }}>
      <View>
        <Button
          theme={{ colors: { primary: theme.colors.error } }}
          mode="elevated"
          onPress={show}
        >
          {t("reject")}
        </Button>
        <ConfirmDialogV2
          message={t("confirm_following_request_rejection")}
          visible={visible}
          onCancel={hide}
          onConfirm={handleRejectionConfirm}
        />
        <LoadingDialog
          message={t("rejecting") + "..."}
          visible={isRejectPending}
        />
      </View>
      <View>
        <Button
          disabled={isAcceptPending}
          mode="contained"
          onPress={() => {
            accept(requestId);
          }}
        >
          {t("accept")}
        </Button>
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    ...containerMargins,
    paddingVertical: 10,
    gap: 10,
  },
});

export default FollowingRequestsToMeCell;
