import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FollowingRequest } from "../types";
import { acceptFollowingRequest } from "../requests";
import { FOLLOWING_REQUESTS_TO_ME_KEY } from "./useFollowingRequestsToMe";
import * as Burnt from "burnt";
import { t } from "i18next";
import { FRIENDS_QUERY_KEY } from "./useFriendsQuery";

export default function useAcceptFollowingRequestMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: FollowingRequest["id"]) =>
      acceptFollowingRequest(client, requestId),
    onSuccess: (_data, requestId) => {
      qc.setQueriesData(
        { queryKey: FOLLOWING_REQUESTS_TO_ME_KEY },
        (oldData: FollowingRequest[] | undefined) => {
          if (oldData) {
            return oldData.filter((req) => req.id !== requestId);
          }
          return oldData;
        }
      );
    },
    onError: () => {
      Burnt.toast({
        title: t("failed_accept_following_request"),
      });
    },
    onSettled: () => {
      // invalidate followers query
      qc.invalidateQueries({ queryKey: FRIENDS_QUERY_KEY });
    },
  });
}
