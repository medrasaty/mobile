import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useCallback } from "react";
import { getUserQuestions } from "../requests";
import { sort } from "@/lib/ordering";
import { useProfileListContext } from "../contexts/ProfileListContext";

export const enum questionOrderKeys {
  NEWEST = "-created",
  OLDEST = "created",
  MOST_RATED = "ratings_value",
}

/**
 * @deprecated{use useUserQuestions instead}
 */
export default function useProfileQuestions(username: BaseUser["username"]) {
  const client = useAuthClient();

  return useQuery({
    queryKey: [username, "questions"],
    queryFn: async () => await getUserQuestions(client, username),
  });
}
