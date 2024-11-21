import { Question } from "@/types/forum.types";

export const ForumQuestionKeys = {
  all: ["questions"] as const,
  withParams: (params: any) => [...ForumQuestionKeys.all, params],
  detail: (id: Question["id"]) => [...ForumQuestionKeys.all, id],
  detailWithParams: (id: Question["id"], params: any) => [
    ...ForumQuestionKeys.all,
    id,
    params,
  ],
};
