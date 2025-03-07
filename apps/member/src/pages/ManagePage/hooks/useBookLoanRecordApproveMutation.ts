import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchBookLoanRecordApprove } from '@api/book';
import { BOOK_LOAN_RECORD_QUERY_KEY, BOOK_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE } from '@constants/message';
import { useToast } from '@hooks/common/useToast';

/**
 * 도서 대여를 승인합니다.
 */
export function useBookLoanRecordApproveMutation() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: patchBookLoanRecordApprove,
    onSuccess: ({ success, errorMessage }, id) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: BOOK_QUERY_KEY.DETAIL(id),
        });
        queryClient.invalidateQueries({
          queryKey: BOOK_LOAN_RECORD_QUERY_KEY.BOOK(id),
        });
        queryClient.invalidateQueries({
          queryKey: BOOK_LOAN_RECORD_QUERY_KEY.BORROWERS(),
        });
        queryClient.invalidateQueries({
          queryKey: BOOK_LOAN_RECORD_QUERY_KEY.RECORDS_PAGE(),
        });

        addToast({
          state: 'success',
          message: '해당 도서 대여를 승인했어요.',
        });
      } else if (errorMessage) {
        addToast({ state: 'error', message: API_ERROR_MESSAGE[errorMessage] });
      }
    },
  });

  return { bookLoanRecordApproveMutate: mutation.mutate };
}
