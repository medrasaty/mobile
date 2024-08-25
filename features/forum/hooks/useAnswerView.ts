import useAuthClient from "@/hooks/useAuthClient";
import { Answer } from "@/types/forum.types";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useAnswerView(answerId: Answer["id"]) {
  /**
   * create watch recrod for answerId in the server,
   * called once when mounted
   */
  const client = useAuthClient();
  const viewAnswer = useMutation({
    mutationFn: async () =>
      await client.post(`/forum/answers/${answerId}/view/`),
  });

  useEffect(() => {
    viewAnswer.mutate();
  }, []); // only run once
}
