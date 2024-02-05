import { PaginationType } from '@type/api';
import { server } from './server';
import { createPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import { BookItem } from '@type/book';

// 나의 대출내역 조회
export const getMyBooks = async (page: number, size: number, id: number) => {
  const { data } = await server.get<PaginationType<BookItem>>({
    url: createPagination(END_POINT.MY_BOOKS, page, size),
  });
  const myLoanBooks = data.items.filter(
    (book) => book.borrowerId === String(id),
  );
  return myLoanBooks;
};
