import { useMutation } from '@tanstack/react-query';

import { patchActivityGroup } from '@api/activity';
import useToast from '@hooks/common/useToast';

/**
 * 활동 상태를 변경합니다.
 */
export function useActivityGroupStatusMutation() {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: patchActivityGroup,
    onSuccess: (data) => {
      if (!data) {
        toast({
          state: 'error',
          message: '활동 상태 변경에 실패했습니다.',
        });
      } else {
        toast({
          state: 'success',
          message: '활동 상태가 변경되었습니다',
        });
      }
    },
  });

  return { activityGroupStatusMutate: mutation.mutate };
}
