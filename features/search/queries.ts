import useAuthClient from "@/hooks/useAuthClient";
import { Question } from "@/types/forum.types";
import { CursorPaginatedResponse } from "@/types/responses";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { SearchQueryKeys } from "./keys";
import { useForumQuestion } from "@forum/questions/queries";
import { useForumQuestions } from "@forum/queries";
import { useSchools } from "@features/schools/queries";
import { PaginatedResponse } from "@/types/requests";
import { BaseUser } from "@/types/user.types";

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

export function useLatestQuestions(params: any = {}) {
  const q = useForumQuestions(params);

  const data = useMemo(() => {
    // return first ten items from the list
    if (q.data) {
      return q.data.slice(0, 10);
    }
    return undefined;
  }, [q.data]);

  return {
    ...q,
    data,
  };
}

// use latest schools
export function useLatestSchools(params: any = {}) {
  const q = useSchools();
  const data = useMemo(() => {
    if (!q.data) return [];
    return q.data.slice(0, 10);
  }, [q.data]);
  return {
    ...q,
    data,
  };
}

// useLatestUsers
export function useLatestUsers(params: any = {}) {
  const client = useAuthClient();

  const q = useQuery({
    queryKey: ["latest_users"],
    queryFn: async () => {
      // get latest users from api
      const res = await client.get<PaginatedResponse<BaseUser>>(`/users/`, {
        params: {
          ...params,
        },
      });
      return res.data.results;
    },
  });

  const data = useMemo(() => {
    if (!q.data) return [];
    return q.data.slice(0, 10);
  }, [q.data]);
  return {
    ...q,
    data,
  };
}
