import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getAllFollowers } from "../requests";

export const FOLLOWERS_QUERY_KEY = "followers";

export default function useFollowerQuery() {
  const client = useAuthClient();
  return useQuery({
    queryKey: [FOLLOWERS_QUERY_KEY],
    queryFn: async () => getAllFollowers(client),
  });
}
