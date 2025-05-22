import useAuthClient from "@/hooks/useAuthClient";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { WatchHistoryKeys } from "./keys";
import * as Burnt from "burnt";
import { t } from "i18next";
import { deleteWatchHistory } from "./requests";
import { WatchHistory } from "./types";
import { CursorPaginatedResponse } from "@/types/responses";
import { clearPages, filterPages } from "../friendship/utils";
import { request } from "@/lib/api";
import Toast from "@/lib/toast";

export default function useClearWatchHistoryMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: WatchHistoryKeys.clearHisory,
    mutationFn: async () => {
      // clear user watch history
      return await request({ 
        url: `/activities/watch_history/clear/`,
        method: "DELETE",
    })
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

      Toast.success(t("success_clear_history"))
    },
    onError: async () => {
      Toast.error(t("failed_clear_history"));
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
