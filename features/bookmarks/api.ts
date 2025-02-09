import useAuthClient, { AuthClient } from "@/hooks/useAuthClient";
import { BaseQuestion } from "@/types/forum.types";

/**
 * Unified place for making requests
 * Experimental feature
 */

export const api = {
  questions: {
    unbookmark: async (questionId: BaseQuestion["id"]) => {
      const client = AuthClient();
      return await client.delete(`/forum/questions/${questionId}/unbookmark/`);
    },
  },
};

export async function removeBookmarkQuestion(questionId: string) {
  api.questions.unbookmark(questionId);
}
