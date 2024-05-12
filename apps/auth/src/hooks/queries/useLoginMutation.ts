import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/src/api/auth';
import {
  AUTH_ATOM_DEFAULT,
  AUTH_ATOM_STATE,
  useSetAuthStore,
} from '@/src/store/auth';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@constants/message';
import { REDIRECT_WITH_TOKEN } from '@utils/service';

import { XClabAuth } from '@type/server';

/**
 * 로그인 정보로 로그인 시도를 합니다.
 */
export const useLoginMutation = () => {
  const setAuth = useSetAuthStore();

  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ success, data, authHeader }, { id, code }) => {
      if (!success || !authHeader) return; // 실패

      const parsedAuthHeader = JSON.parse(authHeader) as XClabAuth;

      if (
        data === false &&
        'accessToken' in parsedAuthHeader &&
        'refreshToken' in parsedAuthHeader
      ) {
        // data is false, OTP 미사용자
        // OTP 미사용자 로그인 성공, 리다이렉트
        alert(SUCCESS_MESSAGE.AUTH);
        window.location.href = REDIRECT_WITH_TOKEN(code, parsedAuthHeader);
      } else if ('secretKey' in parsedAuthHeader) {
        // data is true, OTP 사용자
        // 최초 로그인, secretKey를 저장합니다
        setAuth({
          id,
          step: AUTH_ATOM_STATE.FIRST_LOGIN,
          secretKey: parsedAuthHeader.secretKey,
        });
      } else {
        // 최초 로그인이 아닐 경우, Two Factor 인증으로 넘어감
        setAuth({
          id,
          step: AUTH_ATOM_STATE.TWO_FACTOR,
          secretKey: '',
        });
      }
    },
    onError: () => {
      setAuth(AUTH_ATOM_DEFAULT);
      alert(ERROR_MESSAGE.SERVER);
    },
  });

  return { loginMutate: mutation.mutate, isPending: mutation.isPending };
};
