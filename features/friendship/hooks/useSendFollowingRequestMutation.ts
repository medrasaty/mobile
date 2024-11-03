import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import { sendFollowingRequest } from "../requests";
import * as Burnt from "burnt";
import { useTranslation } from "react-i18next";
import { FollowingRequestStatus } from "@/features/profile/types.types";

export default function useSendFollowingRequestMutation() {
  const client = useAuthClient();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ["follow_request"],
    mutationFn: async (username: BaseUser["username"]) =>
      sendFollowingRequest(client, username),

    onSuccess: async (data, username, context) => {
      // update profile
      const profile = await queryClient.getQueryData(["profile", username]);
      if (profile) {
        queryClient.setQueryData(["profile", username], {
          ...profile,
          following_request_status: FollowingRequestStatus.PENDING,
        });
      }

      // show success Toast message
      Burnt.toast({
        title: t("success_follow_request"),
        haptic: "success",
      });
    },
    onError: (error) => {
      // show error message
      Burnt.toast({
        title: t("failed_follow_request"),
        haptic: "error",
      });
    },

    onSettled: (data, error, username) => {
      // Invalidate query at the end.
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });
}
