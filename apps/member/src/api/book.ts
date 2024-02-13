import { PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { BookItem } from '@type/book';

// 나의 대출내역 조회
export const getMyBooks = async (page: number, size: number, id: string) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<BookItem>>({
    url: createCommonPagination(END_POINT.BOOK_LIST, params),
  });
  const myLoanBooks = data.items.filter((book) => book.borrowerId === id);
  return myLoanBooks;
};
