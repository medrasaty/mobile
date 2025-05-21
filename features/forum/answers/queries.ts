import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getAnswers } from "./requests";
import { AnswersQK } from "./keys";
import { Answer } from "./types";
import { useMemo } from "react";

/**
 * Hook to fetch forum answers with optimized performance options
 * 
 * @param params API parameters for the answers query
 * @param options React Query options for performance tuning
 * @returns Query result with answers data
 */
export function useForumAnswers(
  params: any = {}, 
  options?: Omit<UseQueryOptions<Answer[], unknown, Answer[], any[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: AnswersQK.withParams(params),
    queryFn: async () => await getAnswers(params),
    // Default performance optimizations
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...options
  });
}

/**
 * Hook to fetch a single forum answer
 * 
 * @param answerId ID of the answer to fetch
 * @param params Additional API parameters
 * @returns Query result with the specific answer data
 */
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
