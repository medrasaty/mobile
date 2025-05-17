import { useInfiniteQuery } from "@tanstack/react-query";
import { CursorPaginatedResponse } from "@/types/responses";
import { request } from "@/lib/api";

type InfiniteQueryOptions<T> = {
  queryKey: unknown[];
  initialPath: string;
  params?: Record<string, any>;
  transformResults?: (items: T[]) => T[];
};

/**
 * A reusable hook for infinite queries using the request utility
 * 
 * @template T - The type of items in the response
 * @param options - Configuration options for the infinite query
 * @param options.queryKey - The React Query cache key
 * @param options.initialPath - The initial API endpoint path
 * @param options.params - Optional query parameters
 * @param options.transformResults - Optional function to transform the response items
 * @returns An infinite query result that can be used with InfiniteScreenListV3
 */
export function useInfiniteData<T>({
  queryKey,
  initialPath,
  params = {},
  transformResults,
}: InfiniteQueryOptions<T>) {
  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }): Promise<CursorPaginatedResponse<T>> => {
      const response = await request<CursorPaginatedResponse<T>>({
        url: pageParam,
        method: 'GET',
        params
      });
      
      // Apply transformation if provided
      const results = transformResults 
        ? transformResults(response.data.results)
        : response.data.results;
        
      return {
        ...response.data,
        results
      };
    },
    initialPageParam: initialPath,
    getNextPageParam: (lastPage) => lastPage.next,
  });
} 