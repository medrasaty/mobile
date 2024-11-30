import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { unfollow, follow, followBack } from "./requests";
import * as Burnt from "burnt";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { ProfileQueryKeys } from "@/features/profile/keys";
import { FriendsQueryKeys } from "./hooks/useFriendsQuery";
import { FriendUser } from "./types";
import { UserProfile } from "@/features/profile/types";

export type FollowMutateParams = {
  pk: BaseUser["pk"];
};

function useFollowMutationOptions(): UseMutationOptions<
  void,
  Error,
  FollowMutateParams
> {
  const qc = useQueryClient();

  return {
    onSuccess: async (_data, variables) => {
      const { pk } = variables;
      const profile = qc.getQueryData<{ is_following: boolean }>([
        "profile",
        pk,
      ]);

      if (profile) {
        qc.setQueryData(ProfileQueryKeys.detail(pk), {
          ...profile,
          is_following: true,
        });
      }

      qc.invalidateQueries({ queryKey: FriendsQueryKeys.all });

      Burnt.toast({
        title: t("success_follow"),
        haptic: "success",
      });
    },
    onError: () => {
      Burnt.toast({
        title: t("error_follow"),
        haptic: "error",
      });
    },
    onSettled: (_data, _error, variables) => {
      qc.invalidateQueries({
        queryKey: ProfileQueryKeys.detail(variables.pk),
      });
    },
  };
}

export function useFollowMutation(): UseMutationResult<
  void,
  Error,
  FollowMutateParams
> {
  const client = useAuthClient();
  const { t } = useTranslation();

  return useMutation<void, Error, FollowMutateParams>({
    // @ts-ignore
    mutationFn: async ({ pk }) => follow(client, pk),
    ...useFollowMutationOptions(),
  });
}

export function useFollowBackMutation(): UseMutationResult<
  void,
  Error,
  FollowMutateParams
> {
  const client = useAuthClient();
  const { t } = useTranslation();

  return useMutation<void, Error, FollowMutateParams>({
    // @ts-ignore
    mutationFn: async ({ pk }) => followBack(client, pk),
    ...useFollowMutationOptions(),
  });
}

/**
 * Unfollow user
 */

interface UnfollowMutateParams {
  pk: BaseUser["pk"];
}

export function useUnfollowMutation() {
  /**
   * Unfollow user
   */
  const client = useAuthClient();
  const qc = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (params: UnfollowMutateParams) =>
      await unfollow(client, params.pk),

    // onSuccess
    // - update is_following property in profile of user with 'username'
    // - update the following count of the current user
    onSuccess: async (data, variables, context) => {
      const { pk } = variables;

      // Update profile
      qc.setQueryData(
        ProfileQueryKeys.detail(pk),
        (profile: UserProfile | undefined) => {
          return profile ? { ...profile, is_following: false } : profile;
        }
      );

      // Update followings queries,
      qc.setQueriesData(
        {
          queryKey: FriendsQueryKeys.followings(),
        },
        (oldData: FriendUser[] | undefined) => {
          if (!oldData) {
            return oldData;
          }

          return oldData.filter((f) => f.pk !== pk);
        }
      );

      // Update followers queries.
      qc.setQueriesData(
        {
          queryKey: FriendsQueryKeys.followers(),
        },
        (oldData: FriendUser[] | undefined) => {
          if (!oldData) {
            return oldData;
          }
          return oldData.map((friend) => {
            if (friend.pk === pk) {
              console.log("found friend");
              console.log(friend);

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
        queryKey: ProfileQueryKeys.detail(variables.pk),
      });
    },
  });
}
