import { useMutation } from '@tanstack/react-query';

import { postApplicationMember } from '@api/application';
import { useToast } from '@hooks/common/useToast';

/**
 * 합격자 멤버 단일 생성
 */
export function useApplicationMemberMutation() {
  const { addToast } = useToast();

  return useMutation({
    mutationFn: postApplicationMember,
    onSuccess: (data) => {
      if (data === null) {
        return addToast({
          state: 'error',
          message: `합격 처리 후에 멤버 생성이 가능해요.\n다른 원인이라면 코어팀에 문의해주세요.`,
        });
      }
      addToast({
        state: 'success',
        message: '멤버 생성이 완료되었습니다.',
      });
    },
  });
}
