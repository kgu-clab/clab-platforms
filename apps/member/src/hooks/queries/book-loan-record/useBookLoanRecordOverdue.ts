import { useSuspenseQuery } from '@tanstack/react-query';

import { getBookLoanRecordOverdue } from '@api/book';
import { QUERY_KEY } from '@constants/key';

import type { WithPaginationParams } from '@type/api';

interface UseBookLoanRecordOverduePrams extends WithPaginationParams {}

/**
 * 도서 연체자를 조회합니다.
 */
export function useBookLoanRecordOverdue({
  page = 0,
  size = 20,
}: UseBookLoanRecordOverduePrams = {}) {
  return useSuspenseQuery({
    queryFn: () =>
      getBookLoanRecordOverdue({
        page,
        size,
      }),
    queryKey: [QUERY_KEY.BOOK_LOAN_RECORD_OVERDUE, { page, size }],
  });
}
