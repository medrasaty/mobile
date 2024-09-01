import useAuthClient from "@/hooks/useAuthClient";
import { Answer, Question } from "@/types/forum.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios } from "axios";
import { transformDates } from "../utils";

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
    queryFn: async () => await fetchQuestionAnswers(client, questionId),
  });
}

async function fetchQuestionAnswers(client: Axios, questionId: Question["id"]) {
  const response = await client.get(`/forum/answers/`, {
    params: { question: questionId },
  });

  const answers = response.data.results.map((answer: Answer) =>
    transformDates(answer)
  );
  return answers;
}

async function fetchAnswer(client: Axios, id: Answer["id"]) {
  const response = await client.get(`/forum/answers/${id}/`);
  return response.data;
}

export function useAnswerQuery(id: Answer["id"]) {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["answer", id],
    queryFn: async () => await fetchAnswer(client, id),
  });
}
