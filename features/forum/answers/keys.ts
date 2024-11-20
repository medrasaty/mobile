export const AnswersQueryKeys = {
  all: ["answers"] as const,
  withParams: (params: any) => [...AnswersQueryKeys.all, params],
};
