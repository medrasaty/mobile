import { useSnackbar } from "@/contexts/SnackbarContext";
import useAuthClient from "@/hooks/useAuthClient";
import { RatingValue } from "@/types/forum.types";
import { Answer } from "@forum/answers/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "axios";
import { calcNewRatingsValue } from "../utils";
import { AnswersQK } from "@forum/answers/keys";

async function RateAnswer(client: Axios, answer: Answer, value: RatingValue) {
  const data = { value: value };
  return await client.post(`/forum/answers/${answer.id}/rate/`, data);
}

export default function useAnswerRatingMutation(answer: Answer) {
  const client = useAuthClient();
  const qc = useQueryClient();
  const { show: showSnackbark } = useSnackbar();

  return useMutation({
    mutationFn: (userRating: RatingValue) =>
      RateAnswer(client, answer, userRating),
    onMutate: (userRating: RatingValue) => {
      const queryKey = AnswersQK.withParams({
        question: answer.question.id ?? answer.question,
      });
      qc.cancelQueries({ queryKey: queryKey });

      const updater = (oldDate: Answer[]) => {
        // I want to grap the specific answer and update its ratings_value and user_rating accordingly
        // oldDate is a list of answers , loop throw them and update the specific one
        return oldDate.map((oldAnswer) => {
          if (oldAnswer.id === answer.id) {
            let previousRatingsValue = oldAnswer.ratings_value;
            let previousUserRating = oldAnswer.user_rating;
            let currentRating = userRating;

            return {
              ...oldAnswer,
              ratings_value: calcNewRatingsValue(
                previousRatingsValue,
                previousUserRating,
                currentRating
              ),
              user_rating: userRating,
            };
          }
          return oldAnswer;
        });
      };

      qc.setQueryData(queryKey, updater);
    },

    onError: async (error) => {
      console.error(error);
      showSnackbark("something went wrong!");
      // TODO resetRating
    },
    onSettled: (_data, _error, variables) => {
      qc.invalidateQueries({
        queryKey: AnswersQK.withParams({
          question: answer.question.id ?? answer.question,
        }),
      });
    },
  });
}
