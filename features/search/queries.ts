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
import { useInfiniteData } from "@/lib/hooks/useInfiniteData";

export type SearchTypes = "schools" | "users" | "questions";

export type useSearchProps = {
  query: string;
  type: SearchTypes;
};

/**
 * Hook for searching different types of content
 * @template T - The type of data being searched
 * @param {useSearchProps} props - Search parameters
 * @returns {Object} Search results and query state
 */
export default function useSearch<T>({ query, type }: useSearchProps) {

  // Use the new useInfiniteData hook for better efficiency
  const infiniteQuery = useInfiniteData<T>({
    queryKey: SearchQueryKeys.withTypeAndQuery({ query, type }),
    initialPath: `/search/${type}/`,
    params: { q: query },
    enabled: query.trim().length > 0, // Only run the query if there's a valid search term
  });

  // Extract and flatten data from pages
  const data = useMemo(() => {
    if (!infiniteQuery.data) return [];
    return infiniteQuery.data.pages.map((page) => page.results).flat();
  }, [infiniteQuery.data]);

  return {
    ...infiniteQuery,
    data,
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
