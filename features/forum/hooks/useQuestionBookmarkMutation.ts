import { useSnackbar } from "@/contexts/SnackbarContext";
import useAuthClient from "@/hooks/useAuthClient";
import { DetailQuestion, Question } from "@/types/forum.types";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export default function useQuestionBookmarkMutation(
  questionId: Question["id"]
) {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  const { show: showSnackbar } = useSnackbar();

  const QUERY_KEY = ["question", questionId];

  function BaseBookmarkMutation({
    mutationFn,
    bookmark,
  }: {
    mutationFn: any;
    bookmark: boolean;
  }) {
    return useMutation({
      mutationFn: mutationFn,
      onMutate: (questionId: Question["id"]) => {
        queryClient.cancelQueries({ queryKey: QUERY_KEY });
        queryClient.setQueryData(QUERY_KEY, (old: DetailQuestion) => ({
          ...old,
          is_bookmarked: bookmark,
        }));
      },
      onError: (error) => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        showSnackbar("حدث خطأ ما");
      },
    });
  }

  const bookmarkQuestion = async (questionId: Question["id"]) => {
    return await client.post(`/forum/questions/${questionId}/bookmark/`);
  };

  const bookmarkMutation = BaseBookmarkMutation({
    mutationFn: bookmarkQuestion,
    bookmark: true,
  });

  const unbookmarkQuestion = async (questionId: Question["id"]) => {
    return await client.delete(`/forum/questions/${questionId}/unbookmark/`);
  };

  const unbookmarkMutation = BaseBookmarkMutation({
    mutationFn: unbookmarkQuestion,
    bookmark: false,
  });

  return {
    bookmark: bookmarkMutation.mutate,
    unbookmark: unbookmarkMutation.mutate,
    isError: bookmarkMutation.isError || unbookmarkMutation.isError,
  };
}
