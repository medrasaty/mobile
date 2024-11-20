import useAuthClient from "@/hooks/useAuthClient";
import { Answer, Reply } from "@/types/forum.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "axios";
import { transformDates } from "../utils";
import { AnswersQueryKeys } from "@forum/answers/keys";

type replyData = {
  answer: Answer["id"];
  text: Reply["text"];
};

export default function useCreateReplyMutation() {
  /**
   * handle creating and mutation replies for answer
   */
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: replyData) => await createReply(client, data),
    onError: async (error, variables) => {
      console.error(error);
    },
    onSuccess: (data: Reply, variables) => {
      // update replies query
      qc.setQueryData(["replies", data.answer], (oldReplies: Reply[]) => {
        if (!oldReplies) return data;
        return [data, ...oldReplies];
      });

      qc.invalidateQueries({
        queryKey: AnswersQueryKeys.all,
      });
    },
  });
}

export async function createReply(
  client: Axios,
  data: replyData
): Promise<Reply> {
  const response = await client.post(`/forum/replies/`, data, {
    transformResponse: (response) => {
      // response is row string ( backend serialized object)
      const data = JSON.parse(response);
      return transformDates(data);
    },
  });

  return response.data;
}
