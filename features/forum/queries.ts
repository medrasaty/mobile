import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getForumQuestions } from "./requests";
import { QuestionsQueryKeys } from "./keys";

export function useForumQuestions(params: any = {}) {
  const client = useAuthClient();

  return useQuery({
    queryKey: QuestionsQueryKeys.withParams({ expands: "subject", ...params }),
    queryFn: async () =>
      getForumQuestions(client, { expands: "subject", ...params }),
  });
}
