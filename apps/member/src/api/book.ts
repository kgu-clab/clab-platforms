import { createPagination, createURL } from '@clab-platforms/utils';

import { END_POINT } from '@constants/api';

import type {
  BaseResponse,
  ResponsePagination,
  WithPaginationParams,
} from '@type/api';
import type {
  Book,
  BookItem,
  BookLoanRecordConditionType,
  BookLoanRecordOverDueResponse,
} from '@type/book';

import { server } from './server';

export interface BookLoanRequestParams {
  bookId: number;
  borrowerId: string;
}

export interface GetBookLoanRecordConditionsParams
  extends WithPaginationParams {
  bookId?: number;
  borrowerId?: string;
  isReturned?: boolean;
}

export interface GetBooksParams {
  page: number;
  size: number;
  title?: string;
}

/**
 * 도서 목록 조회
 */
export async function getBooks({ page, size, title }: GetBooksParams) {
  const { data } = await server.get<ResponsePagination<BookItem>>({
    url: createPagination(END_POINT.BOOK, { page, size, title }),
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
 * 도서 대출
 */
export async function postBorrowBook(body: BookLoanRequestParams) {
  return server.post<BookLoanRequestParams, BaseResponse<number>>({
    url: END_POINT.BOOK_LOAN_BORROW,
    body,
  });
}

/**
 * 도서 반납
 */
export async function postReturnBook(body: BookLoanRequestParams) {
  const { data } = await server.post<
    BookLoanRequestParams,
    BaseResponse<number>
  >({
    url: END_POINT.BOOK_LOAN_RETURN,
    body,
  });

  return data;
}

/**
 * 도서 연장
 */
export function postExtendBook(body: BookLoanRequestParams) {
  return server.post<BookLoanRequestParams, BaseResponse<number>>({
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
}: GetBookLoanRecordConditionsParams) {
  const { data } = await server.get<
    ResponsePagination<BookLoanRecordConditionType>
  >({
    url: createPagination(END_POINT.BOOK_LOAN_CONDITIONS, {
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
}: WithPaginationParams) {
  const { data } = await server.get<
    ResponsePagination<BookLoanRecordOverDueResponse>
  >({
    url: createPagination(END_POINT.BOOK_LOAN_OVERDUE, {
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
    url: createURL(END_POINT.BOOK_LOAN_RECORD_APPROVE, id),
  });
}

/**
 * 도서 등록
 */
export async function postRegisterBook(body: Book) {
  return server.post<Book, BaseResponse<number>>({
    url: END_POINT.BOOK,
    body,
  });
}

/**
 * 도서 삭베
 */
export async function deleteBook(id: number) {
  return server.del<never, BaseResponse<number>>({
    url: END_POINT.BOOK_DETAIL(id),
  });
}
