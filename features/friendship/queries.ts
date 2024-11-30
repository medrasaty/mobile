import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getAllFollowers, getFollowings } from "./requests";
import { FriendsQueryKeys } from "./hooks/useFriendsQuery";

export function useFollowersQuery() {
  const client = useAuthClient();

  return useQuery({
    queryKey: FriendsQueryKeys.followers(),
    queryFn: async () => await getAllFollowers(client),
  });
}

export function useFollowingQuery(params: any = {}) {
  const client = useAuthClient();
  return useQuery({
    queryKey: FriendsQueryKeys.followingsWithParams(params),
    queryFn: async () => await getFollowings(client, params),
  });
}
