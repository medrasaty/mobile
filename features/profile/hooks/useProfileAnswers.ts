import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getUserAnswers } from "../requests";
import { useProfileListContext } from "../contexts/ProfileListContext";

export default function useProfileAnswers(username: BaseUser["username"]) {
  const client = useAuthClient();
  const { answersSelectedSort: selectedSort } = useProfileListContext();
  return useQuery({
    queryKey: ["answers", username, selectedSort.key],
    queryFn: async () =>
      await getUserAnswers(client, username, selectedSort.key),
  });
}
