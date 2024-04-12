import { useMutation } from '@tanstack/react-query';

import { postTwoFactorLogin } from '@api/auth';
import { ERROR_MESSAGE, REDIRECT, SUCCESS_MESSAGE } from '@constants/api';
import { useCode } from '@hooks/useCode';
import { AUTH_ATOM_DEFAULT, useSetAuthStore } from '@store/auth';

export const useTwoFactorLoginMutation = () => {
  const setAuth = useSetAuthStore();
  const { code } = useCode();

  const twoFactorLoginMutation = useMutation({
    mutationFn: postTwoFactorLogin,
    onSuccess: ({ success, authHeader }) => {
      if (!authHeader) return;

      const parsedAuthHeader = JSON.parse(authHeader);
      const { accessToken, refreshToken } = parsedAuthHeader;

      if (!code || !success) {
        alert(ERROR_MESSAGE.AUTH);
        return;
      }

      if (accessToken && refreshToken) {
        // 로그인 성공, 서비스로 리다이렉트 합니다
        alert(SUCCESS_MESSAGE.AUTH);
        window.location.href = `${REDIRECT(code)}/?a=${accessToken}&r=${refreshToken}`;
      } else {
        alert(ERROR_MESSAGE.AUTH);
      }
    },
    onError: () => {
      setAuth(AUTH_ATOM_DEFAULT);
      alert(ERROR_MESSAGE.SERVER);
    },
  });

  return { twoFactorLoginMutate: twoFactorLoginMutation.mutate };
};
