import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BQKeys } from "./keys";
import { BookmarkQuestion } from "./types";
import { api } from "./api";
import { BaseQuestion } from "@/types/forum.types";
import Toast from "@/lib/toast";
import { PaginatedResponse } from "@/types/responses";

export function useRemoveBookmarkQuestionMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (questionId: BaseQuestion["id"]) =>
      await api.questions.unbookmark(questionId),

    onSuccess: (_data, questionId) => {
      // remove question from bookmarks list.

      qc.setQueryData(
        BQKeys.all,
        (old: PaginatedResponse<BookmarkQuestion> | undefined) => {
          if (!old) return old;

          const results = old.results.filter((bookmarkQuestion) => {
            return bookmarkQuestion.question.id != questionId;
          });

          return {
            ...old,
            results: results,
          };
        }
      );

      Toast.success("solo is success");
    },

    onError: (error, questionId) => {
      Toast.error("solo is error");
      console.error(JSON.stringify(error));
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: BQKeys.all });
    },
  });
}

export function useClearBookmarksMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["clear_bookmarks"],
  });
}
