import { useSnackbar } from "@/contexts/SnackbarContext";
import useAuthClient from "@/hooks/useAuthClient";
import { rateQuestion as rateQuestionRequest } from "@/requests/forum/question";
import { DetailQuestion, RatingValue } from "@/types/forum.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useQuestionRatingMutation = (question: DetailQuestion) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();
  const { show: showSnack } = useSnackbar();

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

      return { previousQuestion };
    },

    onError: (err, newRating, context: any) => {
      // Reset question when error accure
      console.log(err);
      queryClient.setQueryData(
        ["question", question.id],
        context.previousQuestion
      );

      showSnack("حدث خطأ ما.");
    },
  });
};

export default useQuestionRatingMutation;
