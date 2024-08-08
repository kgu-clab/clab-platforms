import { useMutation } from '@tanstack/react-query';

import { deleteActivityGroup } from '@api/activity';
import useToast from '@hooks/common/useToast';

/**
 * 활동을 삭제합니다.
 */
export function useActivityGroupDeleteMutation() {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: deleteActivityGroup,
    onSuccess: (data) => {
      if (!data) {
        toast({
          state: 'error',
          message: '활동 그룹 삭제에 실패했습니다.',
        });
      } else {
        toast({
          state: 'success',
          message: '활동 그룹 삭제에 성공했습니다.',
        });
      }
    },
  });

  return { activityGroupDeleteMutate: mutation.mutate };
}
