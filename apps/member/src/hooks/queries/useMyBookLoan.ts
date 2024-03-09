import { getMyBooks } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

/**
 * 내가 대여한 도서 목록을 조회합니다.
 */
export const useMyBookLoan = (id: string, page = 0, size = 20) => {
  return useSuspenseQuery({
    queryFn: () => getMyBooks(id, page, size),
    queryKey: [QUERY_KEY.MY_BOOK, id],
  });
};
