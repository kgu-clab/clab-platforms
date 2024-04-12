import { API_BASE_URL, END_POINTS } from '../constants/api';

export interface PostLoginBody {
  [key: string]: string;
  id: string;
  password: string;
}

export interface PostTwoFactorLoginBody {
  [key: string]: string;
  memberId: string;
  totp: string;
}

export const postLogin = async (body: PostLoginBody) => {
  const url = API_BASE_URL + END_POINTS.LOGIN;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const authHeader = response.headers.get('X-Clab-Auth');
  const responseBody = await response.json();

  return {
    success: responseBody.success,
    authHeader: authHeader,
    id: body.id,
  };
};

export const postTwoFactorLogin = async (body: PostTwoFactorLoginBody) => {
  const url = API_BASE_URL + END_POINTS.TWO_FACTOR_LOGIN;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const authHeader = response.headers.get('X-Clab-Auth');
  const responseBody = await response.json();

  return {
    success: responseBody.success,
    authHeader: authHeader,
  };
};
