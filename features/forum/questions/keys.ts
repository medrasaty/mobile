export const ForumQuestionKeys = {
  all: ["questions"] as const,
  withParams: (params: any) => [...ForumQuestionKeys.all, params],
};
