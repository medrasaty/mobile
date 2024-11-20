import useAuthClient from "@/hooks/useAuthClient";
import { Answer } from "@/types/forum.types";
import { AnswersQueryKeys } from "@forum/answers/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { t } from "i18next";

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
    };
  };

  const mutation = useMutation({
    mutationFn: createanswerRequest,
    onSuccess: (newAnswer: Answer | undefined, variables) => {
      qc.setQueryData(
        AnswersQueryKeys.withParams({ question: variables.question }),

        (oldAnswers: Answer[] | undefined) => {
          if (!oldAnswers) return [newAnswer];
          return [newAnswer, ...oldAnswers];
        }
      );
      Burnt.toast({
        title: t("successfully_created_answer"),
        haptic: "success",
      });
    },
    onError: (error) => {
      Burnt.toast({
        title: t("network_error"),
        haptic: "error",
      });
    },
  });

  return mutation;
}
