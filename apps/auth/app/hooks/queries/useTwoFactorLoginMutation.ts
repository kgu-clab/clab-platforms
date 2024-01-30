import { useMutation } from '@tanstack/react-query';
import { AUTH_ATOM_DEFAULT, useSetAuthStore } from '@store/auth';
import { postTwoFactorLogin } from '@api/auth';
import { useSearchParams } from 'next/navigation';
import { ERROR_MESSAGE, REDIRECT, SUCCESS_MESSAGE } from '@constants/api';

export const useTwoFactorLoginMutation = () => {
  const setAuth = useSetAuthStore();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');

  const twoFactorLoginMutation = useMutation({
    mutationFn: postTwoFactorLogin,
    onSuccess: ({ success, data }) => {
      const { accessToken, refreshToken } = data;

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
