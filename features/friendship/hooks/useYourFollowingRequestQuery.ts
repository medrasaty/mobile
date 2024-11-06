import useAuthClient from "@/hooks/useAuthClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFollowingRequestsFromUser } from "../requests";
import { FilterOption } from "@/components/FilterOptionsView";
import { useMemo } from "react";
import { areListsEqual } from "@/lib/utils";

type useYourFollowingRequestQueryProps = {
  params: any;
};

export const FOLLOWING_REQUESTS_FROM_ME_QUERY_KEY = [
  "following_requests",
  "from_me",
];

const FRFMKeys = {
  all: FOLLOWING_REQUESTS_FROM_ME_QUERY_KEY,
  withParams: (params: useYourFollowingRequestQueryProps["params"]) => [
    ...FRFMKeys.all,
    params,
  ],
};

export default function useYourFollowingRequestQuery({
  params,
}: useYourFollowingRequestQueryProps) {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useQuery({
    queryKey: FRFMKeys.withParams(params),
    queryFn: async () => await getFollowingRequestsFromUser(client, params),
  });
}
