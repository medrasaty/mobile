import ConfirmDialog, {
  ConfirmDialogV2,
  confirmStatus,
} from "@/components/ConfirmDialog";
import { useFollowMutation } from "@/features/friendship/hooks/useFollowMutation";
import useUnfollowMutation from "@/features/friendship/hooks/useUnfollowMutation";
import useVisible from "@/hooks/useVisible";
import { BaseUser } from "@/types/user.types";
import { t } from "i18next";
import { Button, ButtonProps } from "react-native-paper";
import useFollowBackMutation from "../hooks/useFollowBackMutation";
import useSendFollowingRequestMutation from "../hooks/useFollowRequestMutation";
import LoadingDialog from "@/components/LoadingDialog";

type FollowButtonsProps = {
  username: BaseUser["username"];
} & Omit<ButtonProps, "children">;

const FollowButton = ({ username, ...props }: FollowButtonsProps) => {
  const { mutate: follow } = useFollowMutation();
  const handlePress = () => {
    // TODO: Follow user
    follow({ username });
  };

  return (
    <Button onPress={handlePress} mode="contained" {...props}>
      {t("follow")}
    </Button>
  );
};

const FollowBack = ({ username, ...props }: FollowButtonsProps) => {
  const { mutate: followBack } = useFollowBackMutation();
  const handlePress = () => {
    followBack({ username });
  };

  return (
    <Button onPress={handlePress} mode="contained" {...props}>
      {t("follow_back")}
    </Button>
  );
};

const UnfollowButton = ({ username, ...props }: FollowButtonsProps) => {
  const { mutate: unfollow, isPending } = useUnfollowMutation();
  const { visible, hide, show: showConfirm } = useVisible(false);

  const handleConfirm = () => {
    unfollow({
      username: username,
    });
    hide();
  };

  return (
    <>
      <Button
        disabled={isPending}
        onPress={() => showConfirm()}
        mode="text"
        {...props}
      >
        {t("unfollow")}
      </Button>
      <ConfirmDialogV2
        visible={visible}
        title={t("confirm_unfollow_title")}
        message={t("confirm_unfollow_message")}
        onConfirm={handleConfirm}
        onCancel={hide}
      />
    </>
  );
};

export const FollowRequestButton = ({
  username,
  ...props
}: FollowButtonsProps) => {
  const { mutate: sendRequest } = useSendFollowingRequestMutation();
  return (
    <Button onPress={() => sendRequest(username)} mode="contained" {...props}>
      {t("send_follow_request")}
    </Button>
  );
};

export const FollowRequestStatusButton = () => {
  return (
    <Button disabled mode="contained">
      {t("follow_request_pending")}
    </Button>
  );
};

export { FollowBack, FollowButton, UnfollowButton };
