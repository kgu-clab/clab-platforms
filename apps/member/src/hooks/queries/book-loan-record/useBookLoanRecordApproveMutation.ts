import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchBookLoanRecordApprove } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 도서 대여를 승인합니다.
 */
export function useBookLoanRecordApproveMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const bookLoanRecordApprove = useMutation({
    mutationFn: patchBookLoanRecordApprove,
    onSuccess: (data, variables) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD_CONDITIONS, variables],
        });
        toast({
          state: 'success',
          message: '해당 도서 대여를 승인했어요, 대여자에게 안내를 해주세요.',
        });
      }
    },
  });

  return { bookLoanRecordApproveMutate: bookLoanRecordApprove.mutate };
}
