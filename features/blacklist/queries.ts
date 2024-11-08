import { useQuery } from "@tanstack/react-query";
import { BlackListKeys } from "./queryKeys";
import useAuthClient from "@/hooks/useAuthClient";
import { BlackListUser } from "./types";
import { CursorPaginatedResponse, PaginatedResponse } from "@/types/responses";

export function useBlackListUsers() {
  const client = useAuthClient();
  return useQuery({
    queryKey: BlackListKeys.all,
    queryFn: async (): Promise<BlackListUser[]> => {
      const res = await client.get<PaginatedResponse<BlackListUser>>(
        `/blacklist/`
      );
      return res.data.results.map((u) => ({
        ...u,
        created: new Date(u.created),
      }));
    },
  });
}
