import { FollowingRequestStatus } from "@/features/profile/types";
import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import { ProfileQueryKeys } from "@features/profile/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { useTranslation } from "react-i18next";
import { sendFollowingRequest } from "../requests";

export default function useSendFollowingRequestMutation() {
  const client = useAuthClient();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ["follow_request"],
    mutationFn: async (pk: BaseUser["pk"]) => sendFollowingRequest(client, pk),

    onSuccess: async (data, pk, context) => {
      // update profile
      const profile = await queryClient.getQueryData(
        ProfileQueryKeys.detail(pk)
      );
      if (profile) {
        queryClient.setQueryData(ProfileQueryKeys.detail(pk), {
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

    onSettled: (data, error, pk) => {
      // Invalidate query at the end.
      queryClient.invalidateQueries({ queryKey: ProfileQueryKeys.detail(pk) });
    },
  });
}
