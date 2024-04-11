import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@styles/global.css';
import * as ChannelService from '@channel.io/channel-web-sdk-loader';

import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@hooks/queries';
import { CHANNEL_TALK_TOKEN } from '@constants/environment.ts';
import ToastContainer from '@components/common/Toast/ToastContainer.tsx';
import ModalContainer from '@components/common/Modal/ModalContainer.tsx';

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
