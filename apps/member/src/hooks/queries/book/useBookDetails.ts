import { useSuspenseQuery } from '@tanstack/react-query';

import { getBookDetail } from '@api/book';
import { QUERY_KEY } from '@constants/key';

/**
 * 도서 상세 정보를 조회합니다.
 */
export const useBookDetails = (id: number) => {
  return useSuspenseQuery({
    queryFn: () => getBookDetail(id),
    queryKey: [QUERY_KEY.BOOK_DETAIL, id],
  });
};
