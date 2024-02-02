import { ACCESS_TOKEN_KEY, END_POINT, REFRESH_TOKEN_KEY } from '@constants/api';
import ServerChain from '@gwansikk/server-chain';
import type { TokenType } from '@type/api';

export const server = ServerChain({
  key: 'server',
  baseURL: 'https://api.clab.page',
  headers: {
    'Content-Type': 'application/json',
  },
  interceptors: {
    request: (request) => {
      return request;
    },
    response: (response) => {
      return response;
    },
    error: (response) => {
      const { status } = response;

      if (status === 401) {
        const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);

        server
          .post<null, TokenType>({
            url: END_POINT.LOGIN_REISSUE,
            options: {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          })
          .then(({ accessToken, refreshToken }) => {
            if (accessToken && refreshToken) {
              // 토큰이 정산적으로 발급되었을 때, 새로운 토큰을 저장하고 헤더에 적용합니다.
              sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
              sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
              server.setHeaders({ Authorization: `Bearer ${accessToken}` });
            }
          })
          .finally(() => {
            window.location.reload();
          });
      }

      return response;
    },
  },
});
