import useAuthClient from "@/hooks/useAuthClient";
import { Answer, Question } from "@/types/forum.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios } from "axios";
import { useEffect } from "react";

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
  const queyrClient = useQueryClient();

  const params = {
    question: questionId,
  };
  const answers = useQuery({
    queryKey: ["answers", questionId],
    queryFn: async (): Promise<Answer[]> => {
      const response = await client.get(`/forum/answers/`, { params });
      // format the answers
      return response.data.results.map((answer: Answer) =>
        formatAnswer(answer)
      );
    },
  });

  useEffect(() => {
    // set queryData manually fr each answer so you can get them back using queyrClient with the queryKey like this ["answer", answerId]
    if (answers.isSuccess) {
      for (const answer of answers.data) {
        queyrClient.setQueryData(["answer", answer.id], answer);
      }
    }
  }, [answers.data]);
  return answers;
}

function formatAnswer(answer: Answer) {
  return {
    ...answer,
    created: new Date(answer.created),
    modified: new Date(answer.modified),
  };
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
