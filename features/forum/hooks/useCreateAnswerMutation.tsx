import useAuthClient from "@/hooks/useAuthClient";
import { Answer } from "@/types/forum.types";
import { AnswersQK } from "@forum/answers/keys";
import { createAnswer } from "@forum/answers/requests";
import { answerSchemaType } from "@forum/answers/schema";
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
  const c = useAuthClient();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: answerSchemaType) => createAnswer(c, data),
    onSuccess: (newAnswer: Answer | undefined, variables) => {
      qc.setQueryData(
        AnswersQK.withParams({ question: variables.question }),

        (oldAnswers: Answer[] | undefined) => {
          if (!oldAnswers) return [newAnswer];
          // At the beginning of list
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
