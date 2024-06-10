import { useSuspenseQuery } from '@tanstack/react-query';

import { getBookLoanRecordOverdue } from '@api/book';
import { BOOK_LOAN_RECORD_QUERY_KEY } from '@constants/key';

import type { WithPaginationParams } from '@type/api';

/**
 * 도서 연체자를 조회합니다.
 */
export function useBookLoanRecordOverdue({
  page = 0,
  size = 20,
}: WithPaginationParams = {}) {
  return useSuspenseQuery({
    queryKey: BOOK_LOAN_RECORD_QUERY_KEY.OVERDUE({ page, size }),
    queryFn: () =>
      getBookLoanRecordOverdue({
        page,
        size,
      }),
  });
}
