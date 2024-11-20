import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getAnswers } from "./requests";
import { AnswersQueryKeys } from "./keys";

export function useForumAnswers(params: any = {}) {
  const client = useAuthClient();

  return useQuery({
    queryKey: AnswersQueryKeys.withParams(params),
    queryFn: async () => getAnswers(client, params),
  });
}
