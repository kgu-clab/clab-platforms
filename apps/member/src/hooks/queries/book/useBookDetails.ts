import { useSuspenseQuery } from '@tanstack/react-query';

import { getBookDetail } from '@api/book';
import { BOOK_QUERY_KEY } from '@constants/key';

/**
 * 도서 상세 정보를 조회합니다.
 */
export const useBookDetails = (id: number) => {
  return useSuspenseQuery({
    queryFn: () => getBookDetail(id),
    queryKey: BOOK_QUERY_KEY.DETAIL(id),
  });
};
