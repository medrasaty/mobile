import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getAllFollowers, getFollowings, getFriends } from "../requests";

export const FRIENDS_QUERY_KEY = ["friends"];

export const FriendsQueryKeys = {
  all: FRIENDS_QUERY_KEY,
  followers: () => [...FriendsQueryKeys.all, "followers"],
  followings: () => [...FriendsQueryKeys.all, "followings"],
  followingsWithParams: (params: any) => [
    ...FriendsQueryKeys.all,
    "followings",
    params,
  ],
};

export default function useFriendsQuery() {
  const client = useAuthClient();

  return useQuery({
    queryKey: FriendsQueryKeys.all,
    queryFn: async () => await getFriends(client),
  });
}

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
