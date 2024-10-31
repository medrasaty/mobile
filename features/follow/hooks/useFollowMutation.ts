import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow } from "../requests";
import * as Burnt from "burnt";
import { useTranslation } from "react-i18next";

export type FollowMutateParams = {
  username: BaseUser["username"];
};

export default function useFollowMutation() {
  /**
   * Follow user
   */
  const client = useAuthClient();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationFn: async (params: FollowMutateParams) =>
      await follow(client, params.username),

    // onSuccess
    // - update is_following property in profile of user with 'username'
    // - update the following count of the current user
    onSuccess: async (data, variables, context) => {
      const { username } = variables;

      // update the following count of the current user
      const profile = await queryClient.getQueryData(["profile", username]);
      if (profile) {
        queryClient.setQueryData(["profile", username], {
          ...profile,
          is_following: true,
        });
      }

      // show success Toast message
      Burnt.toast({
        title: t("success_follow"),
        haptic: "success",
      });
    },

    onError: async (error) => {
      // show error Toast message
      Burnt.toast({
        title: "Failed to follow user",
        haptic: "error",
      });
    },
    onSettled: async (data, error, variables, context) => {
      // invalidate current user profile
      // invalidate profile of user with 'username'

      queryClient.invalidateQueries({
        queryKey: ["profile", variables.username],
      });
    },
  });

  return mutation;
}
