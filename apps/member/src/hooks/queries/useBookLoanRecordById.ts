import { getBookLoanByMemberId } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

/**
 * 도서를 대출한 회원의 ID를 기준으로 조회합니다.
 */
export const useBookLoanRecordByMemberId = (
  borrowerId: string,
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryFn: () => getBookLoanByMemberId(borrowerId, page, size),
    queryKey: [QUERY_KEY.BOOK_LOAN_RECORD, borrowerId],
  });
};
