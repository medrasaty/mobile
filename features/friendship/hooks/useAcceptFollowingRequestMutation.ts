import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FollowingRequest } from "../types";
import { acceptFollowingRequest } from "../requests";
import { FOLLOWING_REQUESTS_TO_ME_KEY } from "./useFollowingRequestsToMe";
import * as Burnt from "burnt";
import { t } from "i18next";

export default function useAcceptFollowingRequestMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: FollowingRequest["id"]) =>
      acceptFollowingRequest(client, requestId),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: FOLLOWING_REQUESTS_TO_ME_KEY,
      });
    },
    onError: () => {
      Burnt.toast({
        title: t("failed_accept_following_request"),
      });
    },
  });
}
