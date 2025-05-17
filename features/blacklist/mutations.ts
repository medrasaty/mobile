import useAuthClient from "@/hooks/useAuthClient";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import * as Burnt from "burnt";
import { BlackListUser } from "./types";
import { blockUser, unblockAllUsers, unblockUser } from "./requests";
import { BlackListKeys } from "./keys";
import { BaseUser } from "@/types/user.types";
import { ProfileQueryKeys } from "../profile/keys";
import { UserProfile } from "../profile/types";
import { FriendsQueryKeys } from "../friendship/hooks/useFriendsQuery";
import { FriendUser } from "../friendship/types";
import { CursorPaginatedResponse } from "@/types/responses";
import { filterPages } from "../friendship/utils";
import { t } from "i18next";
import Toast from "@/lib/toast";

export function useUnblockUserMutation(pk: BaseUser["pk"]) {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: BlackListKeys.block(pk),
    mutationFn: async (pk: BlackListUser["pk"]) =>
      await unblockUser(client, pk),
    onSuccess: (_data, pk) => {
      qc.setQueriesData(
        { queryKey: BlackListKeys.all },
        (
          oldData:
            | InfiniteData<CursorPaginatedResponse<BlackListUser>>
            | undefined
        ) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,
            pages: filterPages(oldData.pages, (u) => u.pk !== pk),
          };
        }
      );

      qc.setQueryData(
        ProfileQueryKeys.detail(pk),
        (oldData: UserProfile | undefined) => {
          if (!oldData) {
            return oldData;
          }

          // Current user is no longer blocking this user
          return {
            ...oldData,
            is_blocker: false,
          };
        }
      );

      qc.setQueriesData(
        { queryKey: FriendsQueryKeys.all },
        (oldDate: FriendUser[] | undefined) => {
          if (!oldDate) return oldDate;

          return oldDate.filter((f) => f.pk !== pk);
        }
      );

      Burnt.toast({
        title: "Success unblock user",
        haptic: "success",
      });
    },
    onError: () => {
      // show error message
      Burnt.toast({
        title: "Failed unblock user",
        haptic: "error",
      });
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: BlackListKeys.all });
    },
  });
}

export function useBlockUserMutation(pk: BaseUser["pk"]) {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: BlackListKeys.unblock(pk),
    mutationFn: async (pk: BaseUser["pk"]) => await blockUser(client, pk),

    onSuccess: async (_data, pk) => {
      // invalidate blacklist users
      qc.invalidateQueries({
        queryKey: BlackListKeys.all,
      });

      qc.setQueryData(
        ProfileQueryKeys.detail(pk),
        (oldData: UserProfile | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            is_blocker: true,
            is_follower: false,
            is_following: false,
          };
        }
      );

      Burnt.toast({
        title: "Successfully added user to black list",
        haptic: "success",
      });
    },
    onError: () => {
      Burnt.toast({
        title: "Failed blocking user",
        haptic: "error",
      });
    },
  });
}

/**
 * Mutation for unblocking all users at once
 */
export function useUnblockAllUsersMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: BlackListKeys.unblockAll(),
    mutationFn: async () => await unblockAllUsers(),
    onSuccess: () => {
      // Clear the blacklist in the query cache
      qc.setQueriesData(
        { queryKey: BlackListKeys.all },
        () => {
          return {
            pages: [],
            pageParams: []
          };
        }
      );

      // Show success message
      Toast.success(t("blacklist.success_clearing"));
    },
    onSettled: () => {
      // Invalidate queries that might be affected
      qc.invalidateQueries({ queryKey: BlackListKeys.all });
    },
  });
}
