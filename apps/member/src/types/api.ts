export interface BaseResponse<T = unknown> {
  success: boolean;
  data: T;
}

interface Pagination<T = unknown> {
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
  totalItems: number;
  take: number;
  items: Array<T>;
}

export interface TokenType {
  accessToken: string;
  refreshToken: string;
}

export interface PaginationType<T = unknown>
  extends BaseResponse<Pagination<T>> {}
