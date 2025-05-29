import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getAllFollowers, getFollowings } from "./requests";
import { FriendsQueryKeys } from "./hooks/useFriendsQuery";

export function useFollowersQuery() {
  return useQuery({
    queryKey: FriendsQueryKeys.followers(),
    queryFn: async () => await getAllFollowers(),
  });
}

export function useFollowingQuery(params: any = {}) {
  return useQuery({
    queryKey: FriendsQueryKeys.followingsWithParams(params),
    queryFn: async () => await getFollowings(params),
  });
}
