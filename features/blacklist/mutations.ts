import useAuthClient from "@/hooks/useAuthClient";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import * as Burnt from "burnt";
import { BlackListUser } from "./types";
import { blockUser, unblockUser } from "./requests";
import { BlackListKeys } from "./keys";
import { BaseUser } from "@/types/user.types";
import { ProfileQueryKeys } from "../profile/keys";
import { UserProfile } from "../profile/types.types";
import { FriendsQueryKeys } from "../friendship/hooks/useFriendsQuery";
import { FriendUser } from "../friendship/types";
import { CursorPaginatedResponse } from "@/types/responses";
import { filterPage, filterPages } from "../friendship/utils";

export function useUnblockUserMutation(username: BaseUser["username"]) {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: BlackListKeys.block(username),
    mutationFn: async (username: BlackListUser["username"]) =>
      await unblockUser(client, username),
    onSuccess: (_data, username) => {
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
            pages: filterPages(oldData.pages, (u) => u.username !== username),
          };
        }
      );

      qc.setQueryData(
        ProfileQueryKeys.withUsername(username),
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

          return oldDate.filter((f) => f.username !== username);
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

export function useBlockUserMutation(username: BaseUser["username"]) {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: BlackListKeys.unblock(username),
    mutationFn: async (username: BaseUser["username"]) =>
      await blockUser(client, username),

    onSuccess: async (_data, username) => {
      // invalidate blacklist users
      qc.invalidateQueries({
        queryKey: BlackListKeys.all,
      });

      qc.setQueryData(
        ProfileQueryKeys.withUsername(username),
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
