import useAuthClient from "@/hooks/useAuthClient";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { WatchHistoryKeys } from "./keys";
import { getHistory, getInfiniteHistory } from "./requests";
import { Circle } from "react-native-svg";

export default function useHistory(params: any = {}) {
  const client = useAuthClient();

  return useQuery({
    queryKey: WatchHistoryKeys.withParams(params),
    queryFn: async () => await getHistory(client, params),
  });
}

export function useInfiniteHistory(params: any = {}) {
  const client = useAuthClient();

  return useInfiniteQuery({
    queryKey: WatchHistoryKeys.withParams(params),
    queryFn: async ({ pageParam }) =>
      await getInfiniteHistory(client, pageParam, params),
    initialPageParam: "/activities/watch_history/",
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next;
    },
  });
}
