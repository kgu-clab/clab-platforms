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
  delay = 300, // 재요청 딜레이
) => {
  await new Promise((resolve) => setTimeout(resolve, delay));

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
  // 토큰 갱신이 필요 없는 경우 바로 반환
  if (status !== HTTP_STATUS_CODE.UNAUTHORIZED) return response;
  const preRefreshToken = getRefreshToken();
  // 리프레시 토큰이 없는 경우 로그인 페이지로 이동
  if (!preRefreshToken) {
    removeTokens();
    window.location.reload();
    return response;
  }
  // 잠금 상태인 경우 토큰 갱신을 기다리고 재요청
  if (reissueLock) {
    return retryRequest(response, method);
  }
  // 토큰 갱신 중 요청이 여러 번 들어오는 것을 방지하기 위해 잠금 설정
  reissueLock = true;
  // 토큰 갱신 요청
  try {
    const res = await fetch(createPath(API_BASE_URL, END_POINT.LOGIN_REISSUE), {
      method: 'POST',
      headers: {
        ...authorization(preRefreshToken),
        'Content-Type': 'application/json',
      },
    });

    const { accessToken, refreshToken } = JSON.parse(
      res.headers.get('X-Clab-Auth') ?? '',
    ) as TokenType;

    if (!accessToken || !refreshToken) {
      throw new Error('Invalid token response');
    }

    setTokens(accessToken, refreshToken);
    server.setHeaders(authorization(accessToken));
    return retryRequest(response, method); // 성공적으로 토큰을 갱신한 후 재요청
  } catch (error) {
    removeTokens();
    window.location.reload();
    return response;
  } finally {
    reissueLock = false;
  }
};

export const contentTypeHandler: Interceptor<FetchOptions> = (request) => {
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
