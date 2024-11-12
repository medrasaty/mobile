import useAuthClient from "@/hooks/useAuthClient";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { WatchHistoryKeys } from "./keys";
import { BaseUser } from "@/types/user.types";
import * as Burnt from "burnt";
import { t } from "i18next";
import { deleteWatchHistory } from "./requests";
import { WatchHistory } from "./types";
import { CursorPaginatedResponse } from "@/types/responses";
import { clearPages, filterPage, filterPages } from "../friendship/utils";

export default function useClearWatchHistoryMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: WatchHistoryKeys.clearHisory,
    mutationFn: async (username: BaseUser["username"]) => {
      // clear user watch history

      return await client.delete(`/activities/watch_history/clear/`);
    },

    onSuccess: async (_data, username) => {
      // Clear WatchHistory cache
      qc.setQueriesData(
        { queryKey: WatchHistoryKeys.all },
        (oldData: InfiniteData<CursorPaginatedResponse>) => {
          return {
            ...oldData,
            pages: clearPages(oldData.pages),
          };
        }
      );

      Burnt.toast({
        title: t("success_clear_history"),
        haptic: "success",
      });
    },
    onError: async () => {
      Burnt.toast({
        title: t("failed_clear_history"),
        haptic: "error",
      });
    },
  });
}

export function useDeleteWatchHistoryMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (historyId: WatchHistory["id"]) =>
      await deleteWatchHistory(client, historyId),
    onSuccess: async (_data, historyId) => {
      qc.setQueriesData(
        { queryKey: WatchHistoryKeys.all },
        (
          oldData:
            | InfiniteData<CursorPaginatedResponse<WatchHistory>>
            | undefined
        ) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: filterPages(oldData.pages, (h) => h.id !== historyId),
          };
        }
      );
      Burnt.toast({
        title: t("success_history_record_deletion"),
        haptic: "success",
      });
    },
    onError: (error) => {
      Burnt.toast({
        title: "Couldn't delete history record",
        haptic: "error",
      });
    },
  });
}
