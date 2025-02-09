import useAuthClient from "@/hooks/useAuthClient";
import { DetailQuestion, Question } from "@/types/forum.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ForumQuestionKeys } from "./keys";
import * as Burnt from "burnt";
import { t } from "i18next";
import {
  bookmarkQuestion,
  registerQuestion,
  unbookmarkQuestion,
  unregisterQuestion,
  updateQuestion,
} from "./requests";
import {
  rateQuestionData,
  rateQuestion as rateQuestionRequest,
} from "@/requests/forum/question";
import { calcNewRatingsValue } from "../utils";
import { Subject } from "@/types/school.types";
import { createQuestion } from "@forum/questions/requests";
import { questionSchemaType } from "./schemas";
import { BQKeys } from "@features/bookmarks/keys";
import { BookmarkQuestion } from "@features/bookmarks/types";
import { PaginatedResponse } from "@/types/responses";

export function useBookmarkQuestionMutation() {
  const c = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (questionId: Question["id"]) =>
      bookmarkQuestion(c, questionId),
    onMutate: (questionId) => {
      // optemestically update query cache
      qc.setQueryData(
        ForumQuestionKeys.detail(questionId),
        (oldData: DetailQuestion): DetailQuestion => {
          if (oldData) {
            return {
              ...oldData,
              is_bookmarked: true,
            };
          }

          return oldData;
        }
      );

      Burnt.toast({
        title: t("added_bookmark_succes"),
      });
    },
    onError: (error) => {
      Burnt.toast({
        title: t("network_error"),
      });
    },
    onSettled: (_data, _error, questionId) => {
      // invalidate all quereis
      qc.invalidateQueries({ queryKey: ForumQuestionKeys.detail(questionId) });
    },
  });
}

export function useUnbookmarkQuestionMutation() {
  const c = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (questionId: Question["id"]) =>
      unbookmarkQuestion(c, questionId),
    onMutate: (questionId) => {
      // optemestically update query cache
      qc.setQueryData(
        ForumQuestionKeys.detail(questionId),
        (oldData: DetailQuestion): DetailQuestion => {
          if (oldData) {
            return {
              ...oldData,
              is_bookmarked: false,
            };
          }

          return oldData;
        }
      );

      Burnt.toast({
        title: t("removed_bookmark_succes"),
      });
    },
    onSuccess: (_data, questionId) => {
      qc.setQueryData(
        BQKeys.all,
        (oldData: PaginatedResponse<BookmarkQuestion> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            results: oldData.results.filter(
              (bookmarkQuestion) => bookmarkQuestion.question.id !== questionId
            ),
          };
        }
      );
    },

    onError: (error) => {
      Burnt.toast({
        title: t("network_error"),
      });
    },

    onSettled: (_data, _error, questionId) => {
      // invalidate all quereis
      qc.invalidateQueries({ queryKey: ForumQuestionKeys.detail(questionId) });
      // Invalidate Bookmakred Questions list
      qc.invalidateQueries({ queryKey: BQKeys.all });
    },
  });
}

export function useRegisterQuestionMutation(questionId: Question["id"]) {
  /**
   * should return two mutations , one for registring  and one for deleting registry
   * TODO: Refactor duplication
   */

  const c = useAuthClient();
  const qc = useQueryClient();

  const afterMutation = {
    onError: (_error, questionId) => {
      qc.invalidateQueries({ queryKey: ForumQuestionKeys.detail(questionId) });
      Burnt.toast({
        title: t("failed_register_question"),
      });
    },
  };

  const registerMutation = useMutation({
    mutationFn: async (questionId) => registerQuestion(c, questionId),
    onMutate: async (questionId: Question["id"]) => {
      qc.cancelQueries({ queryKey: ForumQuestionKeys.detail(questionId) });

      qc.setQueryData(
        ForumQuestionKeys.detail(questionId),
        (old: DetailQuestion) => {
          return {
            ...old,
            is_registered: true,
          };
        }
      );
    },
    ...afterMutation,
  });

  const unregisterMutation = useMutation({
    mutationFn: async (questionId) => unregisterQuestion(c, questionId),
    onMutate: async (questionId: Question["id"]) => {
      qc.cancelQueries({ queryKey: ForumQuestionKeys.detail(questionId) });
      qc.setQueryData(
        ForumQuestionKeys.detail(questionId),
        (old: DetailQuestion) => {
          return {
            ...old,
            is_registered: false,
          };
        }
      );
    },
    ...afterMutation,
  });

  return {
    register: registerMutation.mutate,
    unregister: unregisterMutation.mutate,
    error: registerMutation.error || unregisterMutation.error,
    isSuccess: registerMutation.isSuccess || unregisterMutation.isSuccess,
    isError: registerMutation.isError || unregisterMutation.isError,
    data: registerMutation.data || unregisterMutation.data,
  };
}

export function useRateQuestionMutation() {
  const c = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: rateQuestionData) =>
      await rateQuestionRequest(c, data),

    onMutate: async ({ questionId, value: newRating }) => {
      await qc.cancelQueries({
        queryKey: ForumQuestionKeys.detail(questionId),
      });

      const previousQuestion = qc.getQueryData<DetailQuestion>(
        ForumQuestionKeys.detail(questionId)
      );

      const previousRatingsValue = previousQuestion?.ratings_value ?? 0;
      const previousUserRating = previousQuestion?.user_rating ?? 0;
      const currentRating = newRating;

      const newRatingsValue = calcNewRatingsValue(
        previousRatingsValue,
        previousUserRating,
        currentRating
      );

      qc.setQueryData(
        ForumQuestionKeys.detail(questionId),
        (previousQuestion: DetailQuestion) => {
          return {
            ...previousQuestion,
            ratings_value: newRatingsValue,
            user_rating: newRating,
          };
        }
      );

      // rolling back
      return { previousQuestion };
    },

    onError: (err, { questionId, value: newRating }, context: any) => {
      qc.setQueryData(
        ForumQuestionKeys.detail(questionId),
        context.previousQuestion
      );
      Burnt.alert({
        title: t("failed_rating_question"),
      });
    },
    onSettled: (_d, _e, v) => {
      qc.invalidateQueries({
        queryKey: ForumQuestionKeys.detail(v.questionId),
      });
    },
  });
}

export type QuestionData = {
  title: string;
  text: string;
  subject: Subject;
  picture: string | undefined; // picture system path
  tags: string[];
};

export function useCreateQuestionMutation() {
  /**
   * handle creating and validating question data
   */

  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["create_question"],
    mutationFn: async (data: questionSchemaType) =>
      createQuestion(client, data),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data: Question) => {
      // Set question to the catch
      qc.setQueryData(ForumQuestionKeys.detail(data.id), data);
    },
  });
}

export function useUpdateQuestionMutation() {
  /**
   * handle creating and validating question data
   */

  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["update_question"],
    mutationFn: async ({
      questionId,
      data,
    }: {
      questionId: Question["id"];
      data: QuestionData;
    }) => await updateQuestion(client, questionId, data),

    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data: Question) => {
      // Set question to the catch
      qc.setQueryData(ForumQuestionKeys.detail(data.id), data);
    },
  });
}
