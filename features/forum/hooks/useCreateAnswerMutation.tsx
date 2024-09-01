import useAuthClient from "@/hooks/useAuthClient";
import { Answer } from "@/types/forum.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateAnswerMutation() {
  /**
   * create answer mutation,
   * what functionality should this provide ?
   * - the ability to create answer with single function
   * - optemistic updates for questions answer list
   * - error handling in case no internet connection or something
   */
  const client = useAuthClient();
  const qc = useQueryClient();

  const createanswerRequest = async (data: any): Promise<Answer> => {
    const response = await client.post(`/forum/answers/`, data);
    return {
      ...response.data,
      ratings_value: 0,
      created: new Date(response.data.created),
      modified: new Date(response.data.modified),
    };
  };

  const mutation = useMutation({
    mutationFn: createanswerRequest,
    onSuccess: (newAnswer: Answer | undefined, variables) => {
      qc.setQueryData(
        ["answers", variables.question],
        (oldAnswers: Answer[] | undefined) => {
          if (!oldAnswers) return [newAnswer];
          return [newAnswer, ...oldAnswers];
        }
      );
    },
  });

  return mutation;
}
