import useAuthClient from "@/hooks/useAuthClient";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getFollowingRequestsToMe,
  getInfiniteFollowingRequestsToMe,
} from "../requests";

export const FOLLOWING_REQUESTS_TO_ME_KEY = ["following_requests", "to_me"];

const FollowingRequestToMeQueryKeys = {
  all: FOLLOWING_REQUESTS_TO_ME_KEY,
  withParams: (params: any) => [...FOLLOWING_REQUESTS_TO_ME_KEY, params],
};

export default function useFollowingRequestsToMe(params: any = {}) {
  const client = useAuthClient();
  return useQuery({
    queryKey: FollowingRequestToMeQueryKeys.withParams(params),
    queryFn: async () => getFollowingRequestsToMe(client, params),
  });
}

export function useInfiniteFollwingRequestsToMe() {
  const client = useAuthClient();

  const defaultQueryParams = {
    status: "pending",
  };

  return useInfiniteQuery({
    queryKey: FOLLOWING_REQUESTS_TO_ME_KEY,
    queryFn: async ({ pageParam: pageUrl }) =>
      getInfiniteFollowingRequestsToMe(client, defaultQueryParams, pageUrl),
    initialPageParam: "/following_requests/to_me/",
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next;
    },
  });
}
