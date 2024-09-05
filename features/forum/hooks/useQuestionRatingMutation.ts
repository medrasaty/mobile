import { useSnackbar } from "@/contexts/SnackbarContext";
import useAuthClient from "@/hooks/useAuthClient";
import { rateQuestion as rateQuestionRequest } from "@/requests/forum/question";
import { DetailQuestion, Question, RatingValue } from "@/types/forum.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { calcNewRatingsValue } from "../utils";

const useQuestionRatingMutation = (questionID: Question["id"]) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();
  const { show: showSnack } = useSnackbar();

  return useMutation({
    mutationFn: (ratingValue: RatingValue) =>
      rateQuestionRequest(questionID, ratingValue, client),

    onMutate: async (newRating) => {
      await queryClient.cancelQueries({ queryKey: ["question", questionID] });

      const previousQuestion = queryClient.getQueryData<DetailQuestion>([
        "question",
        questionID,
      ]);

      const previousRatingsValue = previousQuestion?.ratings_value ?? 0;
      const previousUserRating = previousQuestion?.user_rating ?? 0;
      const currentRating = newRating;

      const newRatingsValue = calcNewRatingsValue(
        previousRatingsValue,
        previousUserRating,
        currentRating
      );

      queryClient.setQueryData(
        ["question", questionID],
        (old: DetailQuestion) => {
          // previous user_rating must be null if it's a new rating
          return {
            ...old,
            ratings_value: newRatingsValue,
            user_rating: newRating,
          };
        }
      );

      return { previousQuestion };
    },

    onError: (err, newRating, context: any) => {
      // Reset question when error accure
      console.error(err);
      queryClient.setQueryData(
        ["question", questionID],
        context.previousQuestion
      );

      showSnack("حدث خطأ ما.");
    },
  });
};

export default useQuestionRatingMutation;
