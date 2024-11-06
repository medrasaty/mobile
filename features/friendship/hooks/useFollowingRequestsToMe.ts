import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getFollowingRequestsToMe } from "../requests";
import { useMemo } from "react";

export const FOLLOWING_REQUESTS_TO_ME_KEY = ["following_requests", "to_me"];

const FRTMKeys = {
  all: FOLLOWING_REQUESTS_TO_ME_KEY,
  withParams: (params: any) => [...FOLLOWING_REQUESTS_TO_ME_KEY, params],
};

export default function useFollowingRequestsToMe(params: any = {}) {
  const client = useAuthClient();

  const key = useMemo(() => {
    const key = FRTMKeys.withParams(params);
    return key;
    // store the key in global state
    // return the key
  }, [params]);

  return useQuery({
    queryKey: key,
    queryFn: async () => getFollowingRequestsToMe(client, params),
  });
}
