import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getAllFollowers, getAllFollowing, getFriends } from "../requests";

export const FRIENDS_QUERY_KEY = ["friends"];

export const FriendsQueryKeys = {
  all: FRIENDS_QUERY_KEY,
  followers: () => [...FriendsQueryKeys.all, "followers"],
  followings: () => [...FriendsQueryKeys.all, "followings"],
};

export default function useFriendsQuery() {
  const client = useAuthClient();

  return useQuery({
    queryKey: FRIENDS_QUERY_KEY,
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

export function useFollowingQuery() {
  const client = useAuthClient();
  return useQuery({
    queryKey: FriendsQueryKeys.followings(),
    queryFn: async () => await getAllFollowing(client),
  });
}
