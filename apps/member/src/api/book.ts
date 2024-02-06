import { PaginationType } from '@type/api';
import { server } from './server';
import { createPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import { BookItem } from '@type/book';

// 나의 대출내역 조회
export const getMyBooks = async (page: number, size: number, id: string) => {
  const { data } = await server.get<PaginationType<BookItem>>({
    url: createPagination(END_POINT.BOOK_LIST, page, size),
  });
  const myLoanBooks = data.items.filter((book) => book.borrowerId === id);
  return myLoanBooks;
};
