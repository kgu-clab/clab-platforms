import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import type {
  BaseResponse,
  PaginationPramsType,
  PaginationType,
} from '@type/api';
import type {
  BookItem,
  BookLoanRecordConditionType,
  BookLoanRecordItem,
} from '@type/book';

import { server } from './server';

export interface PostBorrowBookPrams extends BookLoanRecordItem {
  memberId: string;
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
export const postBorrowBook = async (body: PostBorrowBookPrams) => {
  const borrowUrl = END_POINT.BOOK_LOAN_BORROW;
  const { data } = await server.post<BookLoanRecordItem, BaseResponse<number>>({
    url: borrowUrl,
    body,
  });

  return data;
};
/**
 * 도서 반납
 */
export const postReturnBook = async (body: BookLoanRecordItem) => {
  const { data } = await server.post<BookLoanRecordItem, BaseResponse<number>>({
    url: END_POINT.BOOK_LOAN_RETURN,
    body,
  });

  return data;
};
/**
 * 도서 연장
 */
export const postExtendBook = async (body: BookLoanRecordItem) => {
  const { data } = await server.post<BookLoanRecordItem, BaseResponse<number>>({
    url: END_POINT.BOOK_LOAN_EXTEND,
    body,
  });

  return { memberId: body.borrowerId, bookId: data };
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
