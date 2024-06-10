import { useSuspenseQuery } from '@tanstack/react-query';

import { getBookLoanRecordConditions } from '@api/book';
import { BOOK_LOAN_RECORD_QUERY_KEY } from '@constants/key';

import type { WithPaginationParams } from '@type/api';

interface Prams extends WithPaginationParams {
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
}: Prams) {
  const bookQueryKey = bookId
    ? BOOK_LOAN_RECORD_QUERY_KEY.BOOK(bookId)
    : undefined;

  const borrowerQueryKey = borrowerId
    ? BOOK_LOAN_RECORD_QUERY_KEY.BORROWER(borrowerId)
    : BOOK_LOAN_RECORD_QUERY_KEY.RECORD({ page, size });

  return useSuspenseQuery({
    queryFn: () =>
      getBookLoanRecordConditions({
        bookId,
        borrowerId,
        isReturned,
        page,
        size,
      }),
    queryKey: bookQueryKey || borrowerQueryKey,
  });
}
