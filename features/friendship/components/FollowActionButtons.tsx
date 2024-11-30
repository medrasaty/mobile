import { ConfirmDialogV2 } from "@/components/ConfirmDialog";
import {
  useFollowMutation,
  useUnfollowMutation,
} from "@/features/friendship/mutations";
import { useVisibleV2 } from "@/hooks/useVisible";
import { BaseUser } from "@/types/user.types";
import { t } from "i18next";
import { Button, ButtonProps } from "react-native-paper";
import useFollowBackMutation from "../hooks/useFollowBackMutation";
import useSendFollowingRequestMutation from "../hooks/useFollowRequestMutation";

type FollowButtonsProps = {
  pk: BaseUser["pk"];
} & Omit<ButtonProps, "children">;

const FollowButton = ({ pk, ...props }: FollowButtonsProps) => {
  const { mutate: follow, isPending } = useFollowMutation();
  const handlePress = () => {
    follow({ pk });
  };

  return (
    <Button
      disabled={isPending}
      loading={isPending}
      onPress={handlePress}
      mode="contained"
      {...props}
    >
      {t("follow")}
    </Button>
  );
};

const FollowBack = ({ pk, ...props }: FollowButtonsProps) => {
  const { mutate: followBack, isPending } = useFollowBackMutation();
  const handlePress = () => {
    followBack({ pk });
  };

  return (
    <Button
      loading={isPending}
      onPress={handlePress}
      mode="contained"
      {...props}
    >
      {t("follow_back")}
    </Button>
  );
};

const UnfollowButton = ({ pk, ...props }: FollowButtonsProps) => {
  const { mutate: unfollow, isPending } = useUnfollowMutation();
  const [visible, showConfirm, hide] = useVisibleV2(false);

  const handleConfirm = () => {
    hide();
    unfollow({
      pk,
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        loading={isPending}
        onPress={() => showConfirm()}
        mode="outlined"
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

export const FollowRequestButton = ({ pk, ...props }: FollowButtonsProps) => {
  const { mutate: sendRequest, isPending } = useSendFollowingRequestMutation();
  return (
    <Button
      disabled={isPending}
      loading={isPending}
      onPress={() => sendRequest(pk)}
      mode="contained"
      {...props}
    >
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
