import ServerChain from '@gwansikk/server-chain';
import { tokenHandler } from './interceptors';

export const server = ServerChain({
  key: 'server',
  baseURL: 'https://api.clab.page',
  headers: {
    'Content-Type': 'application/json',
  },
  interceptors: {
    error: tokenHandler,
  },
});
