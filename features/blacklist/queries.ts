import { BlackListKeys } from "./keys";
import { BlackListUser } from "./types";
import { useInfiniteData } from "@/lib/hooks/useInfiniteData";

/**
 * Hook for fetching blacklisted users with infinite scrolling
 * 
 * @param params - Query parameters to filter results
 * @returns Infinite query result that can be used with InfiniteScreenListV3
 */
export function useInfiniteBlackListUsers(params: any = {}) {
  return useInfiniteData<BlackListUser>({
    queryKey: BlackListKeys.withParams(params),
    initialPath: "/blacklist/",
    params,
    transformResults: (users) => users.map(user => ({
      ...user,
      created: new Date(user.created),
    })),
  });
}
