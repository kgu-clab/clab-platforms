import ServerChain from '@gwansikk/server-chain';
import { contentTypeHandler, tokenHandler } from './interceptors';
import { API_BASE_URL } from '@constants/api';

export const server = ServerChain({
  key: 'server',
  baseURL: API_BASE_URL,
  interceptors: {
    request: contentTypeHandler,
    error: tokenHandler,
  },
});
