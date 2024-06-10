import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyBooks } from '@api/book';
import { MY_BOOK_QUERY_KEY } from '@constants/key';

import type { WithPaginationParams } from '@type/api';

interface Params extends WithPaginationParams {
  memberId: string;
}

/**
 * 내가 대여한 도서 목록을 조회합니다.
 */
export function useMyBookLoan({ memberId, page = 0, size = 20 }: Params) {
  return useSuspenseQuery({
    queryFn: () => getMyBooks(memberId, page, size),
    queryKey: MY_BOOK_QUERY_KEY.BOOK(memberId, { page, size }),
  });
}
