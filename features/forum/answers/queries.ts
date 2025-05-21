import { useQuery } from "@tanstack/react-query";
import { getAnswers } from "./requests";
import { AnswersQK } from "./keys";
import { Answer } from "./types";
import { useMemo } from "react";

export function useForumAnswers(params: any = {}) {
  return useQuery({
    queryKey: AnswersQK.withParams(params),
    queryFn: async () => await getAnswers(params),
  });
}

export function useForumAnswer(answerId: Answer["id"], params: any = {}) {
  const q = useForumAnswers(params);

  const data = useMemo(() => {
    // return the specific answer
    if (q.data) {
      const answer = q.data.find((answer) => answer.id === answerId);

      if (!answer) {
        console.error("couldn't find answer for mutate");
        return undefined;
      }

      return answer;
    }

    return undefined;
  }, [q.data]);

  return {
    ...q,
    data: data,
  };
}
