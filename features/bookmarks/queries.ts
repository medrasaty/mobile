import { request } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { BQKeys } from "./keys";
import { PaginatedResponse } from "@/types/responses";
import { BookmarkQuestion } from "./types";
import { AxiosRequestConfig } from "axios";

/**
 * Get all bookmarked questions for current authenticated user.
 * @param params :params will be passed with request as query params.
 * @returns
 */
export function useBookmarkedQuestionsQuery(params: any = {}) {
  return useQuery({
    queryKey: BQKeys.all,
    queryFn: async () => {
      const res = await request<PaginatedResponse<BookmarkQuestion>>({
        method: "get",
        url: `/forum/bookmarks/questions/`,
        params: params,
      });
      return res.data;
    },
  });
}
