export interface BasePaginatedResponse<T> {
    next: string | null;
    previous: string | null;
    results: T[]
}
export interface PaginatedResponse<T> extends BasePaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CursorPaginatedResponse<T> extends BasePaginatedResponse<T>
