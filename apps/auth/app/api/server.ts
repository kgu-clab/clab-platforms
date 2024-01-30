import ServerChain from '@gwansikk/server-chain';

export const server = ServerChain({
  key: 'server',
  baseURL: 'https://api.clab.page',
  headers: {
    'Content-Type': 'application/json',
  },
});
