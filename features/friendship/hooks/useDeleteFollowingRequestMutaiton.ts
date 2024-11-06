import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFollowingRequest } from "../requests";
import { FollowingRequest } from "../types";
import { FOLLOWING_REQUESTS_FROM_ME_QUERY_KEY } from "./useYourFollowingRequestQuery";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { QueryFilters } from "@tanstack/react-query";

export type useDeleteFollowingRequestMutationProps = {
  username: BaseUser["username"];
};

export default function useDeleteFollowingRequestMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: FollowingRequest["id"]) =>
      deleteFollowingRequest(client, requestId),
    onSuccess: (_data, requestId) => {
      // update
      qc.setQueriesData(
        { queryKey: FOLLOWING_REQUESTS_FROM_ME_QUERY_KEY },
        (oldData: FollowingRequest[] | undefined) => {
          if (oldData) {
            return oldData.filter((req) => req.id !== requestId);
          }
          return oldData;
        }
      );
    },
  });
}
