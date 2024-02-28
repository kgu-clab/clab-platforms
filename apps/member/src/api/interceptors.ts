import { server } from './server';
import { API_BASE_URL, END_POINT, HTTP_STATUS_CODE } from '@constants/api';
import type { FetchOptions, Interceptor } from '@gwansikk/server-chain';
import type { BaseResponse, TokenType } from '@type/api';
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

  if (
    [HTTP_STATUS_CODE.UNAUTHORIZED, HTTP_STATUS_CODE.FORBIDDEN].includes(status)
  ) {
    const preRefreshToken = getRefreshToken();
    if (!preRefreshToken) return response;

    if (reissueLock) {
      // 잠금이 걸려있는 경우, 토큰 갱신 될 때까지 재요청
      return retryRequest(response, method);
    } else {
      // 토큰 갱신 중복 요청 방지
      reissueLock = true;
    }

    const { success, data } = await fetch(
      createPath(API_BASE_URL, END_POINT.LOGIN_REISSUE),
      {
        method: 'POST',
        headers: {
          ...authorization(preRefreshToken),
          'Content-Type': 'application/json',
        },
      },
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return (await response.json()) as BaseResponse<TokenType>;
    });

    if (success === true) {
      const { accessToken, refreshToken } = data;
      setTokens(accessToken, refreshToken);
      server.setHeaders(authorization(accessToken));
      reissueLock = false;
      return retryRequest(response, method, 0);
    } else {
      // 토큰 갱신에 실패한 경우 로그아웃 처리
      removeTokens();
      window.location.reload();
    }
  }

  return response;
};

export const contentTypeHandler: Interceptor<FetchOptions> = (request) => {
  console.log(request.body);
  if (request.body instanceof FormData) {
    // FormData 일 경우  Content-Type을 설정하지 않도록 합니다.
    // Content-Type을 설정하지 않으면 FormData의 Content-Type이 설정되어 전송됩니다.
  } else {
    request.headers = {
      ...request.headers,
      'Content-Type': 'application/json',
    };
  }

  return request;
};
