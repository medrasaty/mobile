import useAuthClient from "@/hooks/useAuthClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { WatchHistoryKeys } from "./keys";
import { getInfiniteHistory } from "./requests";

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
