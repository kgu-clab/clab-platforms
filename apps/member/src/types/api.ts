import { HTTP_ERROR_MESSAGE } from '@constants/api';

export interface BaseResponse<T = unknown> {
  success: boolean;
  data: T;
  errorMessage?: keyof typeof HTTP_ERROR_MESSAGE;
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
 * `PaginationPramsType`를 대체하고 삭제해주세요. -> Params를 Options로 변경
 */
export interface WithPaginationPrams extends PaginationPramsType {}

export type IDType = string | number;

export interface TokenType {
  accessToken: string;
  refreshToken: string;
}

export interface WithFilePrams {
  multipartFile: FormData;
}
