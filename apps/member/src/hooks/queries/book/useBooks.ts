import { useSuspenseQuery } from '@tanstack/react-query';

import { getBooks } from '@api/book';
import { BOOK_QUERY_KEY } from '@constants/key';

/**
 * 도서 목록을 조회합니다.
 */
export const useBooks = (page = 0, size = 6) => {
  return useSuspenseQuery({
    queryFn: () => getBooks(page, size),
    queryKey: BOOK_QUERY_KEY.PAGE({ page, size }),
  });
};
