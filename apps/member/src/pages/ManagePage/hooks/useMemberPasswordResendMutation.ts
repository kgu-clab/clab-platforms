import { useMutation } from '@tanstack/react-query';

import { postResendMemberPassword } from '@api/member';
import { useToast } from '@hooks/common/useToast';

/**
 * 멤버의 비밀번호를 등록된 이메일로 재전송합니다.
 */
export function useMemberPasswordResend() {
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: postResendMemberPassword,
    onSuccess: (data) => {
      if (!data) {
        return addToast({
          state: 'error',
          message: '비밀번호 재전송에 실패했어요.',
        });
      } else {
        addToast({
          state: 'success',
          message: '비밀번호가 등록된 이메일로 재전송됐어요.',
        });
      }
    },
  });

  return { memberPasswordResendMutate: mutation.mutate };
}
