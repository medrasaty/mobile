import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { ForumQuestionKeys } from "./keys";
import { getForumQuestion, getForumQuestions } from "./requests";
import { Question } from "@/types/forum.types";

export function useForumQuestions(params: any = {}) {
  const client = useAuthClient();

  return useQuery({
    queryKey: ForumQuestionKeys.withParams(params),
    queryFn: async () => getForumQuestions(client, params),
  });
}

export function useForumQuestion(questionId: Question["id"], params: any = {}) {
  const client = useAuthClient();

  return useQuery({
    queryKey: ForumQuestionKeys.detail(questionId),
    queryFn: async () => getForumQuestion(client, questionId, params),
  });
}
