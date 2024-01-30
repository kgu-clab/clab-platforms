import { END_POINTS } from '../constants/api';
import { server } from './server';

interface PostLoginBody {
  [key: string]: string;
  id: string;
  password: string;
}

interface PostTwoFactorLoginBody {
  [key: string]: string;
  memberId: string;
  totp: string;
}

export const postLogin = async (body: PostLoginBody) => {
  const response = await server.post({
    url: END_POINTS.LOGIN,
    body,
  });

  return {
    ...response,
    id: body.id,
  };
};

export const postTwoFactorLogin = async (body: PostTwoFactorLoginBody) => {
  return await server.post({
    url: END_POINTS.TWO_FACTOR_LOGIN,
    body,
  });
};
