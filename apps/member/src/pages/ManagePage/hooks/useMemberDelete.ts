import { useMutation } from '@tanstack/react-query';

import { deleteMember } from '@api/member';
import { useToast } from '@hooks/common/useToast';

/**
 * 멤버의 계정을 삭제합니다.
 */
export function useMemberDelete() {
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: (data) => {
      if (!data) {
        return addToast({
          state: 'error',
          message: '계정 삭제에 실패했어요.',
        });
      } else {
        addToast({
          state: 'success',
          message: '계정이 삭제됐어요.',
        });
      }
    },
  });

  return {
    memberDeleteMutate: mutation.mutate,
  };
}
