import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postApplicationMember } from '@api/application';
import { MEMBER_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 합격자 멤버 단일 생성
 */
export function useApplicationMemberMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postApplicationMember,
    onSuccess: (data) => {
      if (data === null) {
        return toast({
          state: 'error',
          message: `합격 처리 후에 멤버 생성이 가능해요.\n다른 원인이라면 코어팀에 문의해주세요.`,
        });
      }
      toast({
        state: 'success',
        message: '멤버 생성이 완료되었습니다.',
      });
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEY.MEMBER(data),
      });
    },
  });

  return { applicationMemberMutate: mutation.mutate };
}
