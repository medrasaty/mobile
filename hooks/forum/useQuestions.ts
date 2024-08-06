import { orderingOptionType } from "@/definitions";
import { DetailQuestion, Question } from "@/definitions/forum.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAuthClient from "../useAuthClient";

type useQuestionsProps = {
  params?: any;
  selectedOrdering: orderingOptionType;
};

export default function useQuestions({
  params,
  selectedOrdering,
}: useQuestionsProps) {
  const client = useAuthClient();
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  params = {
    ...params,
    expand: "subject",
  };

  const fetchQuestions = async (): Promise<Question[]> => {
    const response = await client.get("/forum/questions/", { params });
    return response.data.results.map(transformQuestion);
  };

  const q = useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });

  useEffect(() => {
    if (q.data) {
      setFilteredQuestions(q.data);
    }
  }, [q.data]);

  const applyFiltering = () => {
    if (q.data !== null) {
      setIsFiltering(true);
      new Promise<Question[]>((resolve) => {
        const questions = selectedOrdering.filter(q.data);
        resolve(questions);
      }).then((filteredQuestions) => {
        setFilteredQuestions(filteredQuestions);
        setIsFiltering(false);
      });
    }
  };

  useEffect(() => {
    applyFiltering();
  }, [selectedOrdering, q.data]);

  return {
    ...q,
    isFetching: q.isFetching,
    isFiltering: isFiltering,
    filteredData: filteredQuestions,
  };
}

function transformQuestion(
  question: Question | DetailQuestion
): Question | DetailQuestion {
  return {
    ...question,
    created: new Date(question.created),
  };
}

export function useQuestion(questionId: string) {
  const client = useAuthClient();

  const fetchQuestion = async (): Promise<DetailQuestion> => {
    const response = await client.get(`/forum/questions/${questionId}/`);
    return transformQuestion(response.data);
  };

  return useQuery({
    queryKey: ["question", questionId],
    queryFn: fetchQuestion,
  });
}
