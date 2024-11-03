import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { FriendUser } from "../types";
import { FOLLOWING_QUERY_KEY } from "./useFollowingQuery";
import { FOLLOWERS_QUERY_KEY } from "./useFollowersQuery";
import * as Burnt from "burnt";
import { followBack } from "../requests";
import { BaseUser } from "@/types/user.types";

export default function useFollowBackMutation() {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username }: { username: BaseUser["username"] }) =>
      await followBack(client, username),
    onSuccess: async (data, variables) => {
      /** Updates for the following queries
       */

      const { username } = variables;

      // set is_following to true
      const profile = await queryClient.getQueryData(["profile", username]);
      if (profile) {
        queryClient.setQueryData(["profile", username], {
          ...profile,
          is_following: true,
        });
      }

      // update friends query
      const friends = await queryClient.getQueryData(["friends"]);
      if (friends) {
        queryClient.setQueryData(["friends"], (old: FriendUser[]) => {
          return old.map((user) => {
            if (user.username === username) {
              return {
                ...user,
                is_following: true,
              };
            }
            return user;
          });
        });
      }

      // show success Toast message

      Burnt.toast({
        title: t("success_follow_back"),
        haptic: "success",
      });
    },
    onError: (error) => {
      // show error Toast message
      Burnt.toast({
        title: t("failed_follow_back"),
        haptic: "error",
      });
    },

    onSettled: (_data, _error, variables) => {
      const { username } = variables;

      queryClient.invalidateQueries({
        queryKey: ["profile", username],
      });

      queryClient.invalidateQueries({
        queryKey: [FOLLOWERS_QUERY_KEY],
      });

      queryClient.invalidateQueries({
        queryKey: [FOLLOWING_QUERY_KEY],
      });
    },
  });
}
