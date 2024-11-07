export interface BasePaginatedResponse<T> {
    next: string | null;
    previous: string | null;
    results: T[]
}
export interface PaginatedResponse extends BasePaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CursorPaginatedResponse<T> extends BasePaginatedResponse<T>
