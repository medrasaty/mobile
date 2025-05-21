import useAuthClient from "@/hooks/useAuthClient";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ForumQuestionKeys } from "./keys";
import { getForumQuestion, getForumQuestions } from "./requests";
import { Question } from "@/types/forum.types";

/**
 * Hook to fetch multiple forum questions with optimized performance
 * 
 * @param params API parameters for filtering questions
 * @returns Query result with questions data
 */
export function useForumQuestions(params: any = {}) {
  const client = useAuthClient();

  return useQuery({
    queryKey: ForumQuestionKeys.withParams(params),
    queryFn: async () => getForumQuestions(client, params),
    // Default performance optimizations
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to fetch a single forum question with optimized performance
 * 
 * @param questionId ID of the question to fetch
 * @param params Additional API parameters
 * @param options React Query options for performance tuning
 * @returns Query result with the specific question data
 */
export function useForumQuestion(
  questionId: Question["id"], 
  options?: Omit<UseQueryOptions<Question, unknown, Question, any[]>, 'queryKey' | 'queryFn'>
) {
  const client = useAuthClient();

  return useQuery({
    queryKey: ForumQuestionKeys.detail(questionId),
    queryFn: async () => getForumQuestion(client, questionId, {}),
    // Default performance optimizations
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...options
  });
}
