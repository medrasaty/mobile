import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { follow, followBack } from "../requests";
import * as Burnt from "burnt";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { ProfileQueryKeys } from "@/features/profile/keys";
import { FriendsQueryKeys } from "./useFriendsQuery";

export type FollowMutateParams = {
  username: BaseUser["username"];
};

function useFollowMutationOptions(): UseMutationOptions<
  void,
  Error,
  FollowMutateParams
> {
  const qc = useQueryClient();

  return {
    onSuccess: async (_data, variables) => {
      const { username } = variables;
      const profile = qc.getQueryData<{ is_following: boolean }>([
        "profile",
        username,
      ]);

      if (profile) {
        qc.setQueryData(ProfileQueryKeys.withUsername(username), {
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
        queryKey: ["profile", variables.username],
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
    mutationFn: async ({ username }) => follow(client, username),
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
    mutationFn: async ({ username }) => followBack(client, username),
    ...useFollowMutationOptions(),
  });
}
