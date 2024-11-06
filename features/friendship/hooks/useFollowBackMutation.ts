import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { FriendUser } from "../types";
import { FRIENDS_QUERY_KEY, FriendsQueryKeys } from "./useFriendsQuery";
import * as Burnt from "burnt";
import { followBack } from "../requests";
import { BaseUser } from "@/types/user.types";

export default function useFollowBackMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ username }: { username: BaseUser["username"] }) =>
      await followBack(client, username),
    onSuccess: async (data, variables) => {
      /** Updates for the following queries
       */
      const { username } = variables;

      // set is_following to true
      const profile = await qc.getQueryData(["profile", username]);
      if (profile) {
        qc.setQueryData(["profile", username], {
          ...profile,
          is_following: true,
        });
      }

      let newFriend: FriendUser | undefined = undefined;
      // update friends query
      qc.setQueriesData(
        { queryKey: FRIENDS_QUERY_KEY },
        (oldData: FriendUser[] | undefined) => {
          if (oldData) {
            return oldData.map((friend) => {
              if (friend.username === username) {
                newFriend = {
                  ...friend,
                  is_following: true,
                };
                return newFriend;
              }
              return friend;
            });
          }
          return oldData;
        }
      );

      if (newFriend) {
        qc.setQueryData(
          FriendsQueryKeys.followings(),
          (oldData: FriendUser[] | undefined) => {
            // newFriend on top of the list.
            return oldData ? [newFriend, ...oldData] : oldData;
          }
        );
      }

      // show success Toast message
      Burnt.toast({
        title: t("success_follow_back"),
        haptic: "success",
      });
    },
    onError: (error) => {
      Burnt.toast({
        title: t("failed_follow_back"),
        haptic: "error",
      });
    },

    onSettled: (_data, _error, variables) => {
      const { username } = variables;
      qc.invalidateQueries({
        queryKey: ["profile", username],
      });
    },
  });
}
