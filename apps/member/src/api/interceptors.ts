import { server } from './server';
import { API_BASE_URL, END_POINT, HTTP_STATUS_CODE } from '@constants/api';
import type { Interceptor } from '@gwansikk/server-chain';
import type { TokenType } from '@type/api';
import {
  authorization,
  createPath,
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setTokens,
} from '@utils/api';

let reissueLock = false;

const retryRequest = async (
  response: Response,
  method: string,
  delay = 300,
) => {
  await new Promise((resolve) => setTimeout(resolve, delay)); // 재요청 딜레이

  const accessToken = getAccessToken();
  return fetch(response.url, {
    method: method,
    headers: {
      ...authorization(accessToken),
      'Content-Type': 'application/json',
    },
  });
};

export const tokenHandler: Interceptor<Response> = async (response, method) => {
  const { status } = response;

  if ([HTTP_STATUS_CODE.UNAUTHORIZED].includes(status)) {
    const preRefreshToken = getRefreshToken();
    if (!preRefreshToken) return response;

    if (reissueLock) {
      // 잠금이 걸려있는 경우, 토큰 갱신 될 때까지 재요청
      return retryRequest(response, method);
    } else {
      // 토큰 갱신 중복 요청 방지
      reissueLock = true;
    }

    const { accessToken, refreshToken } = await fetch(
      createPath(API_BASE_URL, END_POINT.LOGIN_REISSUE),
      {
        method: 'POST',
        headers: {
          ...authorization(preRefreshToken),
          'Content-Type': 'application/json',
        },
      },
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return JSON.parse(
          response.headers.get('X-Clab-Auth') ?? '',
        ) as unknown as TokenType;
      })
      .catch((e) => {
        console.error('Token reissue error', e);
        // 토큰 갱신에 실패한 경우 로그아웃 처리
        removeTokens();
        window.location.reload();
        return { accessToken: null, refreshToken: null };
      });

    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
      server.setHeaders(authorization(accessToken));
      reissueLock = false;
      return retryRequest(response, method, 0);
    }
  }

  return response;
};
