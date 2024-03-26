import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { BookItem, BookLoanRecordItem } from '@type/book';
import type { BaseResponse, PaginationType } from '@type/api';

interface PostBorrowBookArgs extends BookLoanRecordItem {
  memberId: string;
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
export const postBorrowBook = async (body: PostBorrowBookArgs) => {
  const borrowUrl = END_POINT.BOOK_LOAN + '/borrow';
  const { data } = await server.post<BookLoanRecordItem, BaseResponse<number>>({
    url: borrowUrl,
    body,
  });

  return { memberId: body.memberId, bookId: body.bookId, data };
};

/**
 * 도서 반납
 */
export const postReturnBook = async (body: BookLoanRecordItem) => {
  const { data } = await server.post<BookLoanRecordItem, BaseResponse<number>>({
    url: END_POINT.BOOK_LOAN_RETURN,
    body,
  });

  return { memberId: body.borrowerId, bookId: body.bookId, data };
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
 * 도서 대출 내역 검색
 */
export const getBookLoanByMemberId = async (
  borrowerId: string,
  page = 0,
  size = 20,
) => {
  const params = { borrowerId, page, size };
  const { data } = await server.get<PaginationType<BookLoanRecordItem>>({
    url: createCommonPagination(END_POINT.BOOK_LOAN_CONDITIONS, params),
  });

  return data;
};
