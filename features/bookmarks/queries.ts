import { AuthClient } from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { BQKeys } from "./keys";
import { PaginatedResponse } from "@/types/responses";
import { BookmarkQuestion } from "./types";

export function useBookmarkedQuestionsQuery(params: any = {}) {
  return useQuery({
    queryKey: BQKeys.all,
    queryFn: async () => {
      const client = AuthClient();
      const url = `/forum/bookmarks/questions/`;

      const res = await client.get<PaginatedResponse<BookmarkQuestion>>(url);
      return res.data;
    },
  });
}
