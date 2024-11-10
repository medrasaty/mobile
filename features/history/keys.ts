export const HistoryKeys = {
  all: ["history"] as const,
  withParams: (params: any) => [...HistoryKeys.all, params],
};
