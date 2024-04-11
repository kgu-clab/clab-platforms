/**
 * 정확한 children을 가진 타입
 */
export type StrictPropsWithChildren<T = object> = T & {
  children: React.ReactNode;
};
/**
 * 페이지네이션 변경 이벤트 타입
 */
export type PaginationOnChange = (page: number) => void;
