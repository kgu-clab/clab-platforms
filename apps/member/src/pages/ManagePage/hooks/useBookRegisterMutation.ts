import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postRegisterBook } from '@api/book';
import { BOOK_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 도서를 추가합니다.
 */
export function useBookRegisterMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postRegisterBook,
    onSuccess: ({ success, errorMessage, data: id }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: BOOK_QUERY_KEY.DETAIL(id),
        });
        queryClient.invalidateQueries({
          queryKey: BOOK_QUERY_KEY.PAGES(),
        });

        toast({
          state: 'success',
          message: '도서를 추가했어요.',
        });
      } else if (errorMessage) {
        toast({ state: 'error', message: '도서 등록에 실패했어요.' });
      }
    },
  });

  return {
    bookRegisterMutate: mutation.mutate,
    bookRegisterIsPending: mutation.isPending,
  };
}
