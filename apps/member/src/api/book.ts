import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import type {
  BaseResponse,
  PaginationPramsType,
  PaginationType,
  WithPaginationPrams,
} from '@type/api';
import type {
  BookItem,
  BookLoanRecordConditionType,
  BookLoanRecordOverDueResponse,
} from '@type/book';

import { server } from './server';

export interface BorrowerBookInfo {
  bookId: number;
  borrowerId: string;
}

export interface GetBookLoanRecordConditionsPrams extends PaginationPramsType {
  bookId?: number;
  borrowerId?: string;
  isReturned?: boolean;
}
/**
 * 도서 목록 조회
 */
export const getBooks = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<BookItem>>({
    url: createCommonPagination(END_POINT.BOOK, params),
  });

  return data;
};
/**
 * 도서 상세 조회
 */
export const getBookDetail = async (id: number) => {
  const { data } = await server.get<BaseResponse<BookItem>>({
    url: END_POINT.BOOK_DETAIL(id),
  });

  return data;
};
/**
 * 나의 대출내역 조회
 */
export const getMyBooks = async (id: string, page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<BookItem>>({
    url: createCommonPagination(END_POINT.BOOK, params),
  });

  return data.items.filter((book) => book.borrowerId === id);
};
/**
 * 도서 대출
 */
export const postBorrowBook = async (body: BorrowerBookInfo) => {
  const borrowUrl = END_POINT.BOOK_LOAN_BORROW;
  const { data } = await server.post<BorrowerBookInfo, BaseResponse<number>>({
    url: borrowUrl,
    body,
  });

  return data;
};
/**
 * 도서 반납
 */
export const postReturnBook = async (body: BorrowerBookInfo) => {
  const { data } = await server.post<BorrowerBookInfo, BaseResponse<number>>({
    url: END_POINT.BOOK_LOAN_RETURN,
    body,
  });

  return data;
};
/**
 * 도서 연장
 */
export const postExtendBook = async (body: BorrowerBookInfo) => {
  const { data } = await server.post<BorrowerBookInfo, BaseResponse<number>>({
    url: END_POINT.BOOK_LOAN_EXTEND,
    body,
  });

  return data;
};
/**
 * 도서 대출 내역 조회
 */
export const getBookLoanRecordConditions = async ({
  bookId,
  borrowerId,
  isReturned,
  page = 0,
  size = 20,
}: GetBookLoanRecordConditionsPrams) => {
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
};
/**
 * 도서 연체자 조회
 */
export const getBookLoanRecordOverdue = async ({
  page,
  size,
}: WithPaginationPrams) => {
  const { data } = await server.get<
    PaginationType<BookLoanRecordOverDueResponse>
  >({
    url: createCommonPagination(END_POINT.BOOK_LOAN_OVERDUE, {
      page,
      size,
    }),
  });

  return data;
};
