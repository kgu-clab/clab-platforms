import type { ServerResponse } from '@/src/types/server';
import { parserAuthHeader } from '@utils/api';
import { type ServiceCode } from '@utils/service';

import { END_POINTS, createURL } from '../constants/api';

export interface PostLoginData {
  id: string;
  password: string;
  code: ServiceCode;
}

export interface PostTwoFactorLoginData {
  memberId: string;
  totp: string;
  code: ServiceCode;
}
/**
 * 멤버 로그인
 */
export const postLogin = async (data: PostLoginData) => {
  const response = await fetch(createURL(data.code, END_POINTS.LOGIN), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseAuthHeader = response.headers.get('X-Clab-Auth');
  const responseBody = (await response.json()) as ServerResponse;

  const { secretKey, token } = parserAuthHeader(responseAuthHeader);

  return {
    success: responseBody.success,
    data: responseBody.data,
    secretKey: secretKey,
    token: token,
  };
};
/**
 * TOTP 인증
 */
export const postTwoFactorLogin = async (data: PostTwoFactorLoginData) => {
  const response = await fetch(
    createURL(data.code, END_POINTS.TWO_FACTOR_LOGIN),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseAuthHeader = response.headers.get('X-Clab-Auth');
  const responseBody = (await response.json()) as ServerResponse;

  const { secretKey, token } = parserAuthHeader(responseAuthHeader);

  return {
    success: responseBody.success,
    data: responseBody.data,
    secretKey: secretKey,
    token: token,
  };
};
