import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/src/api/auth';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@constants/message';

/**
 * 로그인 정보로 로그인 시도를 합니다.
 */
export const useLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ success, data }) => {
      if (!success) {
        throw new Error();
      }

      if (data === false) {
        // 2차 인증 미사용자, 로그인 성공
        alert(SUCCESS_MESSAGE.LOGIN);
      }
    },
    onError: () => {
      alert(ERROR_MESSAGE.SERVER);
    },
  });

  return { loginMutate: mutation.mutate, isPending: mutation.isPending };
};
