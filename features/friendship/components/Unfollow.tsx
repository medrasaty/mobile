import { Button, ButtonProps } from "react-native-paper";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useProfileScreen } from "@/features/profile/contexts/ProfileScreenContext";

import {
  confirmStatus,
  ConfirmDialog,
  ConfirmDialogV2,
} from "@/components/ConfirmDialog";
import useVisible, { useVisibleV2 } from "@/hooks/useVisible";
import useUnfollowMutation from "../hooks/useUnfollowMutation";
import { useFollowMutation } from "../hooks/useFollowMutation";

export const Unfollow = () => {
  const { profile: user } = useProfileScreen();
  const { t } = useTranslation();
  const { mutate: unfollow, isPending } = useUnfollowMutation();
  const [confirmVisible, showConfirm, hideConfirm] = useVisibleV2(false);

  const icon = useMemo(() => {
    return isPending ? "loading" : "account-outline";
  }, [isPending]);

  const handleConfirm = () => {
    hideConfirm();
    unfollow({
      username: user.username,
    });
  };

  return (
    <>
      <FollowingButton onPress={() => showConfirm()} />
      <ConfirmDialogV2
        visible={confirmVisible}
        title={t("confirm_unfollow_title")}
        message={t("confirm_unfollow_message")}
        onConfirm={handleConfirm}
        onCancel={hideConfirm}
      />
    </>
  );
};

export const Follow = () => {
  const { profile: user } = useProfileScreen();
  const { t } = useTranslation();
  const { mutate: follow } = useFollowMutation();

  const handlePress = () => {
    follow({ username: user.username });
  };

  return <FollowingButton onPress={handlePress} />;
};

type FollowingButtonProps = {
  onPress: ButtonProps["onPress"];
};

export const FollowingButton = ({
  onPress,
  ...props
}: FollowingButtonProps) => {
  /**
   * Button to display different buttons based on isFollowing status.
   * it doesn't perform any actions, just UI
   */
  const { profile } = useProfileScreen();
  const { t } = useTranslation();
  const icon = useMemo(() => {
    return profile.is_following ? "account" : "account";
  }, [profile.is_following]);

  const mode = useMemo(() => {
    return profile.is_following ? "outlined" : "contained";
  }, [profile.is_following]);

  return (
    <Button onPress={onPress} icon={icon} mode={mode}>
      {profile.is_following ? t("unfollow") : t("follow")}
    </Button>
  );
};
