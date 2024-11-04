import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFollowingRequest } from "../requests";
import { FollowingRequest } from "../types";
import { YOUR_FOLLOWING_REQUESTS_QUERY_KEY } from "./useYourFollowingRequestQuery";
import { useSnackbar } from "@/contexts/SnackbarContext";

export type useDeleteFollowingRequestMutationProps = {
  username: BaseUser["username"];
};

export default function useDeleteFollowingRequestMutation() {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: FollowingRequest["id"]) =>
      await deleteFollowingRequest(client, requestId),
    onSuccess: (data, requestId) => {
      /**
       * update YourFollowingRequest query
       */
      queryClient.invalidateQueries({
        queryKey: [YOUR_FOLLOWING_REQUESTS_QUERY_KEY],
      });
    },
  });
}
