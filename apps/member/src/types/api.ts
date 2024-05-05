import { API_ERROR_MESSAGE } from '@constants/message';

/**
 * API Call 시 반환되는 기본 응답 타입입니다.
 * @property success - 성공 여부
 * @property data - 반환 데이터
 * @property errorMessage - 에러 메시지
 */
export type BaseResponse<T = unknown> = {
  success: boolean;
  data: T;
  errorMessage?: keyof typeof API_ERROR_MESSAGE;
};
/**
 * 페이지네이션 기본 타입입니다본
 */
export type Pagination<T = unknown> = {
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
  totalItems: number;
  take: number;
  items: Array<T>;
};
/**
 * 페이지네이션 응답 타입입니다.
 * @deprecated 타입 이름을 명확하게 하기 위해 `PaginationType` 대신 `ResponsePagination`을 사용합니다.
 */
export type PaginationType<T> = BaseResponse<Pagination<T>>;
/**
 * 페이지네이션 응답 타입입니다.
 */
export type ResponsePagination<T> = BaseResponse<Pagination<T>>;
/**
 * 페이지네이션 파라미터 타입입니다.
 */
export type WithPaginationParams = {
  page?: number;
  size?: number;
};
/**
 * ID 타입입니다.
 * @deprecated ID의 타입을 명확하게 하기 위해 IDType을 사용하지 않습니다.
 */
export type IDType = string | number;
/**
 * 토큰 타입입니다.
 * @property accessToken - 엑세스 토큰
 * @property refreshToken - 리프레시 토큰
 */
export type TokenType = {
  accessToken: string;
  refreshToken: string;
};
/**
 * 파일 파라미터 타입입니다.
 * @property multipartFile - 업로드할 파일
 */
export type WithFilePrams = {
  multipartFile: FormData;
};
