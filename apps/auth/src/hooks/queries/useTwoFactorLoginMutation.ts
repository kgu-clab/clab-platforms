import { useMutation } from '@tanstack/react-query';

import { postTwoFactorLogin } from '@/src/api/auth';
import { AUTH_ATOM_DEFAULT, useSetAuthStore } from '@/src/store/auth';
import type { XClabAuth } from '@/src/types/server';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@constants/message';
import { REDIRECT_WITH_TOKEN } from '@utils/service';

/**
 * TOTP 사용자 대상으로 2차 인증을 진행합니다.
 */
export const useTwoFactorLoginMutation = () => {
  const setAuth = useSetAuthStore();

  const mutation = useMutation({
    mutationFn: postTwoFactorLogin,
    onSuccess: ({ success, data, authHeader }, { code }) => {
      if (!success || !authHeader) return; // 실패

      const token = JSON.parse(authHeader) as XClabAuth;

      if (data && 'accessToken' in token && 'refreshToken' in token) {
        // 로그인 성공, 서비스로 리다이렉트 합니다
        alert(SUCCESS_MESSAGE.AUTH);
        window.location.href = REDIRECT_WITH_TOKEN(code, token);
      } else {
        alert(ERROR_MESSAGE.AUTH);
      }
    },
    onError: () => {
      setAuth(AUTH_ATOM_DEFAULT);
      alert(ERROR_MESSAGE.SERVER);
    },
  });

  return { twoFactorLoginMutate: mutation.mutate };
};
