import {
  DetailQuestion,
  Question,
  RatingValue,
} from "@/definitions/forum.types";
import { rateQuestion as rateQuestionRequest } from "@/requests/forum/question";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthClient from "../useAuthClient";
import { useState } from "react";

const useRateQuestion = (question: DetailQuestion) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  return useMutation({
    mutationFn: (ratingValue: RatingValue) =>
      rateQuestionRequest(
        question.id,
        question.user_rating?.id,
        ratingValue,
        client
      ),

    onMutate: async (newRating) => {
      await queryClient.cancelQueries({ queryKey: ["question", question.id] });

      const previousQuestion = queryClient.getQueryData<DetailQuestion>([
        "question",
        question.id,
      ]);

      // queryClient.invalidateQueries({ queryKey: ["question", question.id] });
      const isNewRating = !previousQuestion?.user_rating;
      const previousRatingsValue = previousQuestion?.ratings_value ?? 0;
      const previousUserRatingValue = previousQuestion?.user_rating?.value ?? 0;

      const newRatingsValue = isNewRating
        ? previousRatingsValue + newRating
        : previousRatingsValue - previousUserRatingValue + newRating;

      // update the cached query data
      queryClient.setQueryData(
        ["question", question.id],
        (old: DetailQuestion) => {
          // previous user_rating must be null if it's a new rating
          return {
            ...old,
            ratings_value: newRatingsValue,
            user_rating: {
              ...old.user_rating,
              value: newRating,
            },
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ["questions"] });

      // queryClient.setQueryData(["questions"], (old: Question[]) => {
      //   return old.map((oldQuestion) => {
      //     if (oldQuestion.id === question.id) {
      //       return {
      //         ...oldQuestion,
      //         ratings_value: newRatingsValue,
      //       };
      //     }
      //     return oldQuestion;
      //   });
      // });

      return { previousQuestion };
    },

    onError: (err, newRating, context: any) => {
      queryClient.setQueryData(
        ["question", question.id],
        context.previousQuestion
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["question", question.id] });
    },
  });
};

export default useRateQuestion;
