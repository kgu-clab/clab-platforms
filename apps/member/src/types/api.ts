export interface BaseResponse<T = unknown> {
  success: boolean;
  data: T;
}

export interface Pagination<T = unknown> {
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
  totalItems: number;
  take: number;
  items: Array<T>;
}

export interface PaginationType<T = unknown>
  extends BaseResponse<Pagination<T>> {}

export interface PaginationPramsType {
  page?: number;
  size?: number;
}
/**
 * `PaginationPramsType`를 대체하기 위한 페이지네이션 파라미터 타입입니다.
 */
export interface WithPaginationPrams {
  page?: number;
  size?: number;
}

export type IDType = string | number;

export interface TokenType {
  accessToken: string;
  refreshToken: string;
}

export interface ArgsWithFiles {
  multipartFile: FormData | null;
}
