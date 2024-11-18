import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import * as Burnt from "burnt";
import { Question } from "@/types/forum.types";
import { BaseUser } from "@/types/user.types";
import { ShareQuestionData } from "./types";
import { shareQuestion } from "./requests";

export default function useShareQuestionMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: ShareQuestionData) => shareQuestion(client, data),
    onSuccess: async () => {
      // TODO: invalidate shares query
      Burnt.toast({
        title: "Successfully shared",
        haptic: "error",
      });
    },
    onError: async (error) => {
      Burnt.toast({
        title: "Something went wrong",
        haptic: "error",
      });
    },
  });
}
