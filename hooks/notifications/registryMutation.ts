import { Question } from "@/definitions/forum.types";
import useAuthClient from "../useAuthClient";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Registry } from "@/definitions/notifications.type";
import { useSnackbar } from "@/contexts/SnackbarContext";

export function useRegistryMutation() {
  /**
   * should return two mutations , one for registring and one for deleting registry
   */

  const client = useAuthClient();
  const queryClient = useQueryClient();
  const { show: showSnackbar } = useSnackbar();

  const registerQuestion = async (questionId: Question["id"]) => {
    await client.post("/notifications/registry/", { question: questionId });
  };

  const createMutation = useMutation({
    mutationFn: registerQuestion,
    onMutate: async (questionId: Question["id"]) => {
      queryClient.cancelQueries({ queryKey: ["questions", "registries"] });

      queryClient.setQueryData(["questions", "registries"], (old: any) => {
        return [...old, { question: questionId }];
      });
    },

    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", "registries"] });
      showSnackbar("حصل خطأ ما");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", "registries"] });
      showSnackbar("solo is here and there so you will not here");
    },
  });

  const unregisterQuestion = async (questionId: Question["id"]) => {
    console.log("solo is here", questionId);
    const requestConfig = {
      method: "delete",
      url: "/notifications/registry/",
      data: {
        question: questionId,
      },
    };
    await client.request(requestConfig);
  };

  const deleteMutation = useMutation({
    mutationFn: unregisterQuestion,
    onMutate: async (questionId: Question["id"]) => {
      queryClient.cancelQueries({ queryKey: ["questions", "registery"] });
      queryClient.setQueryData(["questions", "registery"], (old: any) => {
        return old.filter(
          (registery: Registry) => registery.question != questionId
        );
      });
    },
  });

  return {
    register: createMutation.mutate,
    unregister: deleteMutation.mutate,
    error: createMutation.error || deleteMutation.error,
    isSuccess: createMutation.isSuccess || deleteMutation.isSuccess,
    isError: createMutation.isError || deleteMutation.isError,
    data: createMutation.data || deleteMutation.data,
  };
}
