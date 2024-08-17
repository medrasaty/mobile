import { useSnackbar } from "@/contexts/SnackbarContext";
import useAuthClient from "@/hooks/useAuthClient";
import { DetailQuestion, Question } from "@/types/forum.types";
import { Registry } from "@/types/notifications.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useQuestionRegistryMutation(questionId: Question["id"]) {
  /**
   * should return two mutations , one for registring  and one for deleting registry
   */

  const client = useAuthClient();
  const queryClient = useQueryClient();
  const { show: showSnackbar } = useSnackbar();
  const QUERY_KEY = ["question", questionId];

  const registerQuestion = async (questionId: Question["id"]) => {
    await client.post(`/forum/questions/${questionId}/register/`);
  };

  const registerMutation = useMutation({
    mutationFn: registerQuestion,
    onMutate: async (questionId: Question["id"]) => {
      queryClient.cancelQueries({ queryKey: QUERY_KEY });

      queryClient.setQueryData(QUERY_KEY, (old: DetailQuestion) => {
        return {
          ...old,
          is_registered: true,
        };
      });
    },

    onError: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      showSnackbar("حدث خطأ ما");
    },
  });

  const unregisterQuestion = async (questionId: Question["id"]) => {
    await client.delete(`/forum/questions/${questionId}/unregister/`);
  };

  const unregisterMutation = useMutation({
    mutationFn: unregisterQuestion,
    onMutate: async (questionId: Question["id"]) => {
      queryClient.cancelQueries({ queryKey: QUERY_KEY });
      queryClient.setQueryData(QUERY_KEY, (old: DetailQuestion) => {
        return {
          ...old,
          is_registered: false,
        };
      });
    },

    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ["questions", "registery"] });
      showSnackbar("حدث خطأ ما");
    },
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
