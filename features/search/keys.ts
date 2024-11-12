export const SearchQueryKeys = {
  all: ["search"],
  withSearchQuery: (searchQuery: string) => [SearchQueryKeys.all, searchQuery],
};
