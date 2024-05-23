import { useMutation } from '@tanstack/react-query';

import { postTwoFactorLogin } from '@/src/api/auth';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@constants/message';

/**
 * TOTP 사용자 대상으로 2차 인증을 진행합니다.
 */
export function useTwoFactorLoginMutation() {
  const mutation = useMutation({
    mutationFn: postTwoFactorLogin,
    onSuccess: ({ success, data, token }) => {
      if (!success || !data || !token.access || !token.refresh) {
        throw new Error();
      }

      alert(SUCCESS_MESSAGE.TWO_FACTOR_LOGIN);
    },
    onError: () => {
      alert(ERROR_MESSAGE.SERVER);
    },
  });

  return {
    twoFactorLoginMutate: mutation.mutate,
    isPending: mutation.isPending,
  };
}
