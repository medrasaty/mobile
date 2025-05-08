/**
 * Bookmarks Query keys
 */
export const BQKeys = {
  all: ["bookmarked", "questions"] as const,
  withParams: (params: any) => [...BQKeys.all, params],
};
