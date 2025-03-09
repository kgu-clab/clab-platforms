import { useMutation } from '@tanstack/react-query';

import { postAccuses } from '@api/accuse';
import { useToast } from '@hooks/common/useToast';

export const useAccusesMutation = () => {
  const { addToast } = useToast();

  const AccusesPost = useMutation({
    mutationFn: postAccuses,
    onSuccess: () => {
      addToast({
        state: 'success',
        message: '신고가 완료되었습니다.',
      });
    },
  });

  return { accusesMutate: AccusesPost.mutate };
};
