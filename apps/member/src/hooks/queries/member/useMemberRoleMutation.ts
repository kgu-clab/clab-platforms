import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchMemberRole } from '@api/member';
import { MEMBER_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 멤버 레벨을 수정합니다.
 */
export const useMemberRoleMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: patchMemberRole,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: MEMBER_QUERY_KEY.PAGES(),
        });
        toast({
          state: 'success',
          message: '레벨이 수정되었어요.',
        });
      } else {
        toast({
          state: 'error',
          message: '레벨 수정에 실패했어요',
        });
      }
    },
  });

  return { memberRoleMutation: mutation.mutate };
};
