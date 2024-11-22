import useAuthClient from "@/hooks/useAuthClient";
import { Answer, BaseAnswer } from "@forum/answers/types";
import { AnswersQK } from "@forum/answers/keys";
import { mutateAnswer } from "@forum/answers/requests";
import { answerSchemaType } from "@forum/answers/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { t } from "i18next";

export default function useMutateAnswer(
  answerId: Answer["id"] | undefined = undefined
) {
  /**
   * create or update answer.
   * if answerId is given , it will update it , otherwise create new one
   */
  const c = useAuthClient();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: answerSchemaType) =>
      mutateAnswer(c, data, answerId),
    /**
     * if answerId provided, just map over the existing list of answers and update the specific on, add new answer otherwise
     *
     * @param data BaseAnswer | Answer: Answer when it is created, BaseAnswer when updated,
     * @param variables data answerSchemaType:
     */
    onSuccess: (data: BaseAnswer | Answer, variables) => {
      qc.setQueryData(
        AnswersQK.withParams({ question: variables.question }),

        (oldAnswers: Answer[] | undefined) => {
          if (answerId) {
            // update the existing list
            return oldAnswers?.map((answer) => {
              if (answer.id === answerId) {
                // Merege to reflect new changes
                return {
                  ...answer,
                  ...data,
                };
              }
              return answer;
            });
          } else {
            // it is create operation
            if (!oldAnswers) return [data];

            // Insert at the beginning of the list
            return [data, ...oldAnswers];
          }
        }
      );
      Burnt.toast({
        title: answerId
          ? t("successfully_edit_answer")
          : t("successfully_created_answer"),
        haptic: "success",
      });
    },
    onError: (error) => {
      Burnt.toast({
        title: t("network_error"),
        haptic: "error",
      });
    },
    onSettled: (_data, _error, variables) => {
      // invalidate question
      qc.invalidateQueries({
        queryKey: AnswersQK.withParams({ question: variables.question }),
      });
    },
  });

  return mutation;
}
