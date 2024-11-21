import useAuthClient from "@/hooks/useAuthClient";
import { Question } from "@/types/forum.types";
import { Subject } from "@/types/school.types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ForumQuestionKeys } from "@forum/questions/keys";
import { createQuestion } from "@forum/questions/requests";

export type QuestionData = {
  title: string;
  text: string;
  subject: Subject;
  picture: string | undefined; // picture system path
  tags: string[];
};

export default function useCreateQuestionMutation() {
  /**
   * handle creating and validating question data
   */

  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["create_question"],
    mutationFn: async (data: QuestionData) => createQuestion(client, data),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data: Question) => {
      // Set question to the catch
      qc.setQueryData(ForumQuestionKeys.detail(data.id), data);
    },
  });
}
