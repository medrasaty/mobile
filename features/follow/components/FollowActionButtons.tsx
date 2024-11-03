import { BaseUser } from "@/types/user.types";
import { Button, ButtonProps } from "react-native-paper";
import useUnfollowMutation from "@/features/follow/hooks/useUnfollowMutation";
import { t } from "i18next";
import { useFollowMutation } from "@/features/follow/hooks/useFollowMutation";
import useFollowBackMutation from "../hooks/useFollowBackMutation";
import ConfirmDialog, { confirmStatus } from "@/components/ConfirmDialog";
import useVisible from "@/hooks/useVisible";

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
  const { mutate: unfollow } = useUnfollowMutation();
  const { visible, hide, show: showConfirm } = useVisible(false);

  const handleConfirm = (status: confirmStatus) => {
    if (status == confirmStatus.CONFIRM) {
      unfollow({
        username: username,
      });
    }
    hide();
  };

  return (
    <>
      <Button onPress={() => showConfirm()} mode="text" {...props}>
        {t("unfollow")}
      </Button>
      <ConfirmDialog
        visible={visible}
        title={t("confirm_unfollow_title")}
        message={t("confirm_unfollow_message")}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export { FollowButton, FollowBack, UnfollowButton };
