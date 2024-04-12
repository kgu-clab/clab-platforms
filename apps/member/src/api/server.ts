import { API_BASE_URL } from '@constants/api';
import ServerChain from '@gwansikk/server-chain';

import { contentTypeHandler, tokenHandler } from './interceptors';

export const server = ServerChain({
  key: 'server',
  baseURL: API_BASE_URL,
  mode: 'production',
  interceptors: {
    request: contentTypeHandler,
    error: tokenHandler,
  },
});
