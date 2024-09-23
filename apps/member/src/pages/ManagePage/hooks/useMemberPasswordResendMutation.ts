import { useMutation } from '@tanstack/react-query';

import { resendMemberPassword } from '@api/member.ts';
import useToast from '@hooks/common/useToast.ts';

/**
 * 멤버의 비밀번호를 등록된 이메일로 재전송합니다.
 */
export function useMemberPasswordResend() {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: resendMemberPassword,
    onSuccess: (data) => {
      if (!data) {
        return toast({
          state: 'error',
          message: '비밀번호 재전송에 실패했어요.',
        });
      } else {
        toast({
          state: 'success',
          message: '비밀번호가 등록된 이메일로 재전송됐어요.',
        });
      }
    },
  });

  return { memberPasswordResendMutate: mutation.mutate };
}
