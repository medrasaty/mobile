import { useInfiniteQuery } from "@tanstack/react-query";
import { BlackListKeys } from "./keys";
import useAuthClient from "@/hooks/useAuthClient";
import { BlackListUser } from "./types";
import { CursorPaginatedResponse } from "@/types/responses";

export function useInfiniteBlackListUsers(params: any = {}) {
  const client = useAuthClient();

  return useInfiniteQuery({
    queryKey: BlackListKeys.withParams(params),
    queryFn: async ({
      pageParam,
    }): Promise<CursorPaginatedResponse<BlackListUser>> => {
      const res = await client.get<CursorPaginatedResponse<BlackListUser>>(
        pageParam,
        { params }
      );
      return {
        ...res.data,
        results: res.data.results.map((u) => ({
          ...u,
          created: new Date(u.created),
        })),
      };
    },
    initialPageParam: "/blacklist/",
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next;
    },
  });
}
