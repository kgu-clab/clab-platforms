import ServerChain from '@gwansikk/server-chain';

export const server = ServerChain({
  key: 'server',
  baseURL: 'https://api.clab.page',
  mode: 'production',
});
