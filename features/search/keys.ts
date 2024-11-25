const base = ["search"];
export const SearchQueryKeys = {
  all: base,
  withSearchQuery: (searchQuery: string) => [...base, searchQuery],
  withTypeAndQuery: ({ query, type }: { query: string; type: string }) => [
    ...base,
    query,
    type,
  ],
};
