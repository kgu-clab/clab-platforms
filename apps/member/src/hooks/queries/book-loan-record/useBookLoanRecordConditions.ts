import { useSuspenseQuery } from '@tanstack/react-query';

import { getBookLoanRecordConditions } from '@api/book';
import { QUERY_KEY } from '@constants/key';

import type { PaginationPramsType } from '@type/api';

interface UseBookLoanRecordConditionsPrams extends PaginationPramsType {
  bookId?: number;
  borrowerId?: string;
  isReturned?: boolean;
}

/**
 * 도서 대출 내역을 조회합니다.
 */
export function useBookLoanRecordConditions({
  bookId,
  borrowerId,
  isReturned,
  page = 0,
  size = 20,
}: UseBookLoanRecordConditionsPrams) {
  return useSuspenseQuery({
    queryFn: () =>
      getBookLoanRecordConditions({
        bookId,
        borrowerId,
        isReturned,
        page,
        size,
      }),
    queryKey: [QUERY_KEY.BOOK_LOAN_RECORD_CONDITIONS, bookId],
  });
}
