import { useQuery } from "@tanstack/react-query";
import { BlackListKyes } from "./queryKeys";
import useAuthClient from "@/hooks/useAuthClient";
import { BlackListUser } from "./types";

export function useBlackListUsers() {
  const client = useAuthClient();
  return useQuery({
    queryKey: BlackListKyes.all,
    queryFn: async (): Promise<BlackListUser[]> => {
      const res = await client.get<{ results: BlackListUser[] }>(`/blacklist/`);
      return res.data.results;
    },
  });
}
