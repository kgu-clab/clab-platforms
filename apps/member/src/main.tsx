import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { RecoilRoot } from 'recoil';

import { QueryClientProvider } from '@tanstack/react-query';

import ModalContainer from '@components/common/Modal/ModalContainer.tsx';
import ToastContainer from '@components/common/Toast/ToastContainer.tsx';

import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import { CHANNEL_TALK_TOKEN } from '@constants/environment.ts';
import { queryClient } from '@hooks/queries';
import '@styles/globals.css';

import App from './App.tsx';

ChannelService.loadScript();
ChannelService.boot({
  pluginKey: CHANNEL_TALK_TOKEN,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
        <ToastContainer />
        <ModalContainer />
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>,
);
