import { server } from './server';
import { END_POINT } from '@constants/api';
import type { Interceptor } from '@gwansikk/server-chain';
import type { BaseResponse, TokenType } from '@type/api';
import { authorization, getRefreshToken, setTokens } from '@utils/api';

export const tokenHandler: Interceptor<Response> = async (response) => {
  const { status } = response;

  if (status === 401) {
    const preRefreshToken = getRefreshToken();
    if (!preRefreshToken) return response;

    const tokenResponse = await fetch(
      'https://api.clab.page' + END_POINT.LOGIN_REISSUE,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${preRefreshToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const { success, data } =
      (await tokenResponse.json()) as BaseResponse<TokenType>;

    if (success === true) {
      const { accessToken, refreshToken } = data;
      setTokens(accessToken, refreshToken);
      server.setHeaders(authorization(accessToken));
      window.location.reload();
    }
  }

  return response;
};
