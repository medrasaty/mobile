import { request } from "@/lib/api";
import { BaseQuestion } from "@/types/forum.types";
import { AxiosRequestConfig } from "axios";

/**
 * Unified place for making requests
 * Experimental feature
 */
export const api = {
  questions: {
    unbookmark: async (questionId: BaseQuestion["id"]) => {
      const config = {
        url: `/forum/questions/${questionId}/unbookmark/`,
        method: "delete",
      } satisfies AxiosRequestConfig;
      return await request(config);
    },
  },
};

export async function removeBookmarkQuestion(questionId: string) {
  return api.questions.unbookmark(questionId);
}
