export const WatchHistoryKeys = {
  all: ["history"] as const,
  withParams: (params: any) => [...WatchHistoryKeys.all, params],
  clearHisory: ["clear_watch_history"],
};
