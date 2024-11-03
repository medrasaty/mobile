import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../requests";

export const FRIENDS_QUERY_KEY = "friends";

export default function useFriendsQuery() {
  const client = useAuthClient();

  return useQuery({
    queryKey: [FRIENDS_QUERY_KEY],
    queryFn: async () => await getFriends(client),
  });
}
