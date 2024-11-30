import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { FriendUser } from "../types";
import { FRIENDS_QUERY_KEY, FriendsQueryKeys } from "./useFriendsQuery";
import * as Burnt from "burnt";
import { followBack } from "../requests";
import { BaseUser } from "@/types/user.types";
import { ProfileQueryKeys } from "@features/profile/keys";

export default function useFollowBackMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ pk }: { pk: BaseUser["pk"] }) =>
      await followBack(client, pk),
    onSuccess: async (data, variables) => {
      /** Updates for the following queries
       */
      const { pk } = variables;

      // set is_following to true
      const profile = await qc.getQueryData(ProfileQueryKeys.detail(pk));
      if (profile) {
        qc.setQueryData(ProfileQueryKeys.detail(pk), {
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
              if (friend.pk === pk) {
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
      const { pk } = variables;
      qc.invalidateQueries({
        queryKey: ProfileQueryKeys.detail(pk),
      });
    },
  });
}
