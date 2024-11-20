import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { follow, unfollow } from "../requests";
import * as Burnt from "burnt";
import { useTranslation } from "react-i18next";
import { FriendUser } from "../types";
import { FRIENDS_QUERY_KEY, FriendsQueryKeys } from "./useFriendsQuery";
import { UserProfile } from "@/features/profile/types";

interface UnfollowMutateParams {
  username: BaseUser["username"];
}

export default function useUnfollowMutation() {
  /**
   * Unfollow user
   */
  const client = useAuthClient();
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async (params: UnfollowMutateParams) =>
      await unfollow(client, params.username),

    // onSuccess
    // - update is_following property in profile of user with 'username'
    // - update the following count of the current user
    onSuccess: async (data, variables, context) => {
      const { username } = variables;

      qc.setQueryData(
        ["profile", username],
        (profile: UserProfile | undefined) => {
          return profile ? { ...profile, is_following: false } : profile;
        }
      );

      // when you unfollow user, you should remove them from following querys,
      // and update the is_following property on followers query if the user exist
      qc.setQueryData(
        FriendsQueryKeys.followings(),
        (oldData: FriendUser[] | undefined) => {
          if (!oldData) {
            return oldData;
          }
          console.log("updating following query");

          return oldData.filter((f) => f.username !== username);
        }
      );

      qc.setQueryData(
        FriendsQueryKeys.followers(),
        (oldData: FriendUser[] | undefined) => {
          if (!oldData) {
            return oldData;
          }
          return oldData.map((friend) => {
            if (friend.username == username) {
              console.log("updating follower query");
              return {
                ...friend,
                is_following: false,
              };
            }
            return friend;
          });
        }
      );

      // show success Toast message
      Burnt.toast({
        title: t("success_unfollow"),
        haptic: "success",
      });
    },

    onError: async (error) => {
      // show error Toast message
      Burnt.toast({
        title: t("failed_follow"),
        haptic: "error",
      });
    },
    onSettled: async (data, error, variables, context) => {
      // invalidate current user profile
      // invalidate profile of user with 'username'

      qc.invalidateQueries({
        queryKey: ["profile", variables.username],
      });
    },
  });
}
