import { useProfileScreen } from "@/features/profile/contexts/ProfileScreenContext";
import { FollowingRequestStatus } from "@/features/profile/types.types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";
import useSendFollowingRequestMutation from "../hooks/useFollowRequestMutation";

type FollowRequestButtonProps = {};

const FollowingRequestButton = () => {
  const { t } = useTranslation();
  const { profile: user } = useProfileScreen();
  const { mutate: sendFollowingRequest } = useSendFollowingRequestMutation();

  const handlePress = () => {
    sendFollowingRequest(user.username);
  };

  const isPending = useMemo(() => {
    return user.following_request_status === FollowingRequestStatus.PENDING;
  }, [user.following_request_status]);

  return (
    <Button
      disabled={isPending}
      onPress={handlePress}
      icon={"account"}
      mode="contained"
    >
      {isPending ? t("follow_request_pending") : t("follow_request")}
    </Button>
  );
};

export default FollowingRequestButton;
