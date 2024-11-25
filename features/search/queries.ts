import useAuthClient from "@/hooks/useAuthClient";
import { Question } from "@/types/forum.types";
import { CursorPaginatedResponse } from "@/types/responses";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { SearchQueryKeys } from "./keys";

export type SearchTypes = "schools" | "users" | "questions";

export type useSearchProps = {
  query: string;
  type: SearchTypes;
};

export default function useSearch<T>({ query, type }: useSearchProps) {
  /**
   * Search for questions using 'q'
   */

  const client = useAuthClient();

  const q = useInfiniteQuery({
    queryKey: SearchQueryKeys.withTypeAndQuery({ query, type }),
    queryFn: async ({ pageParam }): Promise<CursorPaginatedResponse<T>> => {
      const res = await client.get<CursorPaginatedResponse<T>>(pageParam, {
        params: { q: query },
      });

      return {
        ...res.data,
        results: res.data.results.map((item) => {
          return {
            ...item,
          };
        }),
      };
    },
    initialPageParam: `/search/${type}/`,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next;
    },
  });

  const data = useMemo(() => {
    if (!q.data) return [];
    return q.data.pages.map((page) => page.results).flat();
  }, [q.data]);

  return {
    ...q,
    data: data,
  };
}
