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
