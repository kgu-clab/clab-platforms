import type { ServerResponse } from '@/src/types/server';
import { type RedirectCode } from '@utils/common';

import { API_BASE_URL, END_POINTS } from '../constants/api';

export interface PostLoginData {
  id: string;
  password: string;
  code: RedirectCode;
}

export interface PostTwoFactorLoginData {
  memberId: string;
  totp: string;
  code: RedirectCode;
}
/**
 * 멤버 로그인
 */
export const postLogin = async (data: PostLoginData) => {
  const url = API_BASE_URL + END_POINTS.LOGIN;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const authHeader = response.headers.get('X-Clab-Auth');
  const responseBody = (await response.json()) as ServerResponse;

  return {
    authHeader: authHeader,
    success: responseBody.success,
    data: responseBody.data,
  };
};
/**
 * TOTP 인증
 */
export const postTwoFactorLogin = async (data: PostTwoFactorLoginData) => {
  const url = API_BASE_URL + END_POINTS.TWO_FACTOR_LOGIN;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const authHeader = response.headers.get('X-Clab-Auth');
  const responseBody = (await response.json()) as ServerResponse;

  return {
    authHeader: authHeader,
    success: responseBody.success,
    data: responseBody.data,
  };
};
