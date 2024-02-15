import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { BookItem } from '@type/book';
import type { BaseResponse, PaginationType } from '@type/api';

// 도서 목록 조회
export const getBooks = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<BookItem>>({
    url: createCommonPagination(END_POINT.BOOK, params),
  });

  return data;
};

// 도서 상세 조회
export const getBookDetail = async (id: string) => {
  const { data } = await server.get<BaseResponse<BookItem>>({
    url: END_POINT.BOOK_DETAIL(id),
  });

  return data;
};

// 나의 대출내역 조회
export const getMyBooks = async (page: number, size: number, id: string) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<BookItem>>({
    url: createCommonPagination(END_POINT.BOOK, params),
  });

  return data.items.filter((book) => book.borrowerId === id);
};
