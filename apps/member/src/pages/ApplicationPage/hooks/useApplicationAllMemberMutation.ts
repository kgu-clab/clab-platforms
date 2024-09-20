import { useMutation } from '@tanstack/react-query';

import { postApplicationAllMember } from '@api/application';
import useToast from '@hooks/common/useToast';

/**
 * 모집 내 합격자 계정 일괄 생성
 */
export function useApplicationAllMemberMutation() {
  const toast = useToast();

  return useMutation({
    mutationFn: postApplicationAllMember,
    onSuccess: () => {
      toast({
        state: 'success',
        message:
          '멤버 일괄 생성이 완료되었어요.\n불합격 상태인 지원자의 계정이 생성되지 않아요.',
      });
    },
  });
}
