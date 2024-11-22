export const AnswersQK = {
  all: ["answers"] as const,
  withParams: (params: any) => [...AnswersQK.all, params],
};
