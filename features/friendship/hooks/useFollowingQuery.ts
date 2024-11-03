import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getAllFollowers, getAllFollowing } from "../requests";

export const FOLLOWING_QUERY_KEY = "followings";

export default function useFollowingQuery() {
  const client = useAuthClient();
  return useQuery({
    queryKey: [FOLLOWING_QUERY_KEY],
    queryFn: async () => await getAllFollowing(client),
  });
}
