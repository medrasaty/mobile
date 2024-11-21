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
} from "./requests";

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
          console.log(oldData);

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
