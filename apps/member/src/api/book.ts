import { END_POINT } from '@constants/api';
import { createCommonPagination, createPath } from '@utils/api';

import type {
  BaseResponse,
  PaginationType,
  WithPaginationPrams,
} from '@type/api';
import type {
  BookItem,
  BookLoanRecordConditionType,
  BookLoanRecordOverDueResponse,
} from '@type/book';

import { server } from './server';

export interface BookLoanRequestData {
  bookId: number;
  borrowerId: string;
}

export interface BookLoanRecordSearchOptions extends WithPaginationPrams {
  bookId?: number;
  borrowerId?: string;
  isReturned?: boolean;
}
/**
 * 도서 목록 조회
 */
export async function getBooks(page: number, size: number) {
  const { data } = await server.get<PaginationType<BookItem>>({
    url: createCommonPagination(END_POINT.BOOK, { page, size }),
  });

  return data;
}
/**
 * 도서 상세 조회
 */
export async function getBookDetail(id: number) {
  const { data } = await server.get<BaseResponse<BookItem>>({
    url: END_POINT.BOOK_DETAIL(id),
  });

  return data;
}
/**
 * 나의 대출내역 조회
 */
export async function getMyBooks(id: string, page: number, size: number) {
  const { data } = await server.get<PaginationType<BookItem>>({
    url: createCommonPagination(END_POINT.BOOK, { page, size }),
  });

  return data.items.filter((book) => book.borrowerId === id);
}
/**
 * 도서 대출
 */
export async function postBorrowBook(body: BookLoanRequestData) {
  return server.post<BookLoanRequestData, BaseResponse<number>>({
    url: END_POINT.BOOK_LOAN_BORROW,
    body,
  });
}
/**
 * 도서 반납
 */
export async function postReturnBook(body: BookLoanRequestData) {
  const { data } = await server.post<BookLoanRequestData, BaseResponse<number>>(
    {
      url: END_POINT.BOOK_LOAN_RETURN,
      body,
    },
  );

  return data;
}
/**
 * 도서 연장
 */
export function postExtendBook(body: BookLoanRequestData) {
  return server.post<BookLoanRequestData, BaseResponse<number>>({
    url: END_POINT.BOOK_LOAN_EXTEND,
    body,
  });
}
/**
 * 도서 대출 내역 조회
 */
export async function getBookLoanRecordConditions({
  bookId,
  borrowerId,
  isReturned,
  page = 0,
  size = 20,
}: BookLoanRecordSearchOptions) {
  const { data } = await server.get<
    PaginationType<BookLoanRecordConditionType>
  >({
    url: createCommonPagination(END_POINT.BOOK_LOAN_CONDITIONS, {
      bookId,
      borrowerId,
      isReturned,
      page,
      size,
    }),
  });

  return data;
}
/**
 * 도서 연체자 조회
 */
export async function getBookLoanRecordOverdue({
  page,
  size,
}: WithPaginationPrams) {
  const { data } = await server.get<
    PaginationType<BookLoanRecordOverDueResponse>
  >({
    url: createCommonPagination(END_POINT.BOOK_LOAN_OVERDUE, {
      page,
      size,
    }),
  });

  return data;
}
/**
 * 도서 대출 승인
 */
export function patchBookLoanRecordApprove(id: number) {
  return server.patch<null, BaseResponse<number>>({
    url: createPath(END_POINT.BOOK_LOAN_RECORD_APPROVE, id),
  });
}
