import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FollowingRequest } from "../types";
import { rejectFollowingRequest } from "../requests";
import { FOLLOWING_REQUESTS_TO_ME_KEY } from "./useFollowingRequestsToMe";
import * as Burnt from "burnt";
import { t } from "i18next";
import { CursorPaginatedResponse } from "@/types/responses";
import { InfiniteData } from "@tanstack/react-query";
import { filterPage } from "../utils";

/**
 * @argument duplicate implementation, abstract it away.
 */
export default function useRejectFollowingRequestMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: FollowingRequest["id"]) =>
      rejectFollowingRequest(client, requestId),

    onSuccess: (_data, requestId) => {
      qc.setQueriesData(
        { queryKey: FOLLOWING_REQUESTS_TO_ME_KEY },
        (
          oldData:
            | InfiniteData<CursorPaginatedResponse<FollowingRequest>>
            | undefined
        ) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              filterPage<FollowingRequest>(page, (request) => {
                return request.id !== requestId;
              })
            ),
          };
        }
      );

      Burnt.toast({
        title: t("success_reject_following_request"),
        haptic: "success",
      });
    },
    onError: () => {
      Burnt.toast({
        title: t("failed_reject_following_request"),
      });
    },
  });
}
