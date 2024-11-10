import { CursorPaginatedResponse } from "@/types/responses";

export function updatePage<T>(
  page: CursorPaginatedResponse<T>,
  updater: (item: T) => T
): CursorPaginatedResponse<T> {
  return {
    ...page,
    results: page.results.map(updater),
  };
}

export function filterPage<T>(
  page: CursorPaginatedResponse<T>,
  filter: (item: T) => boolean
): CursorPaginatedResponse<T> {
  return {
    ...page,
    results: page.results.filter(filter),
  };
}

export function filterPages<T>(
  pages: CursorPaginatedResponse<T>[],
  filter: (item: T) => boolean
) {
  return pages.map((page) => filterPage(page, filter));
}
