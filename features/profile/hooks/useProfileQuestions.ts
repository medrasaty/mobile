import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useCallback } from "react";
import { getUserQuestions } from "../requests";
import { sort } from "@/lib/ordering";

export const enum questionOrderKeys {
  NEWEST = "-created",
  OLDEST = "created",
  MOST_RATED = "ratings_value",
}

export default function useProfileQuestions(username: BaseUser["username"]) {
  const client = useAuthClient();
  const [sortKey, setSortKey] = useState<questionOrderKeys>(
    questionOrderKeys.NEWEST
  );

  const query = useQuery({
    queryKey: ["questions", username, sortKey],
    queryFn: async () => await getUserQuestions(client, username, sortKey),
  });

  const orderedQuestions = query.data;
  // // useMemo(() => {
  //   if (!query.data) return [];
  //   return sort(query.data, sortKey);
  // }, [query.data, sortKey]);

  const handleSortKeyChange = useCallback(
    (key: questionOrderKeys) => {
      setSortKey(key);
    },
    [sortKey]
  );

  return {
    ...query,
    orderedQuestions,
    handleSortKeyChange,
  };
}
