import { getBookLoanByMemberId } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useBookLoanRecordByMemberId = (
  borrowerId: string,
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.BOOK_LOAN_RECORD, borrowerId, page, size],
    queryFn: () => getBookLoanByMemberId(borrowerId, page, size),
  });
};
