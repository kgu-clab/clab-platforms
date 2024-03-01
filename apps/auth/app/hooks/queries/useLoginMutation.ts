import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@api/auth';
import {
  AUTH_ATOM_DEFAULT,
  AUTH_ATOM_STATE,
  useSetAuthStore,
} from '@store/auth';
import { ERROR_MESSAGE } from '@constants/api';

export const useLoginMutation = () => {
  const setAuth = useSetAuthStore();

  const logInMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ success, authHeader, id }) => {
      if (!authHeader) return;

      const parsedAuthHeader = JSON.parse(authHeader);
      if (success && parsedAuthHeader.secretKey === null) {
        // 최초 로그인이 아닐 경우, Two Factor 인증으로 넘어감
        setAuth({
          step: AUTH_ATOM_STATE.TWO_FACTOR,
          id,
          secretKey: '',
        });
      } else if (success && parsedAuthHeader.secretKey !== null) {
        // 최초 로그인, secretKey를 저장합니다
        setAuth({
          step: AUTH_ATOM_STATE.FIRST_LOGIN,
          id,
          secretKey: parsedAuthHeader.secretKey,
        });
      }
    },
    onError: () => {
      setAuth(AUTH_ATOM_DEFAULT);
      alert(ERROR_MESSAGE.SERVER);
    },
  });

  return { loginMutate: logInMutation.mutate };
};
