import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyBooks } from '@api/book';
import { MY_BOOK_QUERY_KEY } from '@constants/key';

/**
 * 내가 대여한 도서 목록을 조회합니다.
 */
export const useMyBookLoan = (memberId: string, page = 0, size = 20) => {
  return useSuspenseQuery({
    queryFn: () => getMyBooks(memberId, page, size),
    queryKey: MY_BOOK_QUERY_KEY.BOOK(memberId, { page, size }),
  });
};
