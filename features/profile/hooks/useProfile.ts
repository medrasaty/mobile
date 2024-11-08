import { BaseUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getProfile } from "../requests";
import useAuthClient from "@/hooks/useAuthClient";
import { ProfileQueryKeys } from "../keys";

export default function useProfile(username: BaseUser["username"]) {
  /**
   * Return the user profile
   */

  const client = useAuthClient();

  return useQuery({
    queryKey: ProfileQueryKeys.withUsername(username),
    queryFn: async () => await getProfile(client, username),
  });
}
