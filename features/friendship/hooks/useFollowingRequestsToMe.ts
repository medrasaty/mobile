import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getFollowingRequestsToMe } from "../requests";

export const FOLLOWING_REQUESTS_TO_ME_KEY = ["following_requests", "to_me"];

const FRTMKeys = {
  all: FOLLOWING_REQUESTS_TO_ME_KEY,
  withParams: (params: any) => [...FOLLOWING_REQUESTS_TO_ME_KEY, params],
};

export default function useFollowingRequestsToMe(params: any = {}) {
  const client = useAuthClient();
  return useQuery({
    queryKey: FRTMKeys.withParams(params),
    queryFn: async () => getFollowingRequestsToMe(client, params),
  });
}
