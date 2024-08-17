import useAuthClient from "@/hooks/useAuthClient";
import { Answer, Question } from "@/types/forum.types";
import { useQuery } from "@tanstack/react-query";

export default function useAnswers(params = {}) {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["answers", params],
    queryFn: async (): Promise<Answer[]> => {
      const response = await client.get("/forum/answers/", { params });
      return response.data.results;
    },
  });
}

export function useQuestionAnswers(questionId: Question["id"]) {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["answers", questionId],
    queryFn: async (): Promise<Answer[]> => {
      const response = await client.get(
        `/forum/questions/${questionId}/answers/`
      );
      return response.data;
    },
  });
}