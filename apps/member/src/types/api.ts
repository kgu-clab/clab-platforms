export interface TokenType {
  accessToken: string;
  refreshToken: string;
}

export interface PaginationType<T = unknown> {
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
  totalItems: number;
  take: number;
  items: Array<T>;
}
