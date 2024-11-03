import { Button, ButtonProps } from "react-native-paper";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useProfileScreen } from "@/features/profile/contexts/ProfileScreenContext";

import ConfirmDialog, { confirmStatus } from "@/components/ConfirmDialog";
import useVisible from "@/hooks/useVisible";
import useUnfollowMutation from "../hooks/useUnfollowMutation";
import { useFollowMutation } from "../hooks/useFollowMutation";

export const Unfollow = () => {
  const { profile: user } = useProfileScreen();
  const { t } = useTranslation();
  const { mutate: unfollow, isPending } = useUnfollowMutation();
  const { visible, hide, show: showConfirm } = useVisible(false);

  const icon = useMemo(() => {
    return isPending ? "loading" : "account-outline";
  }, [isPending]);

  const handleConfirm = (status: confirmStatus) => {
    if (status == confirmStatus.CONFIRM) {
      unfollow({
        username: user.username,
      });
    }
    hide();
  };

  return (
    <>
      <FollowingButton onPress={() => showConfirm()} />
      <ConfirmDialog
        visible={visible}
        title={t("confirm_unfollow_title")}
        message={t("confirm_unfollow_message")}
        onConfirm={handleConfirm}
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
