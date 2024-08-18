import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postApplicationAllMember } from '@api/application';
import { MEMBER_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 모집 내 합격자 계정 일괄 생성
 */
export function useApplicationAllMemberMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postApplicationAllMember,
    onSuccess: (data) => {
      toast({
        state: 'success',
        message:
          '멤버 일괄 생성이 완료되었어요.\n불합격 상태인 지원자의 계정이 생성되지 않아요.',
      });

      const queryKeys = data.map((member) => MEMBER_QUERY_KEY.MEMBER(member));

      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });

  return { applicationAllMemberMutate: mutation.mutate };
}
