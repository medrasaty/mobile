import useAuthClient from "@/hooks/useAuthClient";
import { Question } from "@/types/forum.types";
import { CursorPaginatedResponse } from "@/types/responses";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { SearchQueryKeys } from "./keys";

export default function useSearch(q: string) {
  /**
   * Search for questions using 'q'
   */

  const client = useAuthClient();

  const query = useInfiniteQuery({
    queryKey: SearchQueryKeys.withSearchQuery(q),
    queryFn: async ({
      pageParam,
    }): Promise<CursorPaginatedResponse<Question>> => {
      const res = await client.get<CursorPaginatedResponse<Question>>(
        pageParam,
        { params: { q } }
      );

      return {
        ...res.data,
        results: res.data.results.map((question) => {
          return {
            ...question,
            created: new Date(question.created),
            modified: new Date(question.modified),
          };
        }),
      };
    },
    initialPageParam: "/search/questions/",
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next;
    },
  });

  const data = useMemo(() => {
    if (!query.data) return [];
    return query.data.pages.map((page) => page.results).flat();
  }, [query.data]);

  return {
    ...query,
    data: data,
  };
}
