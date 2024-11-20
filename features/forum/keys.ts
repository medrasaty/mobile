export const QuestionsQueryKeys = {
  all: ["questions"] as const,
  withParams: (params: any) => [...QuestionsQueryKeys.all, params],
};
