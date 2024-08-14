import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { RecoilRoot } from 'recoil';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@clab-platforms/design-system/dist/index.css';

import ModalContainer from '@components/common/Modal/ModalContainer.tsx';
import ToastContainer from '@components/common/Toast/ToastContainer.tsx';

import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import { API_BASE_URL } from '@constants/api.ts';
import {
  CHANNEL_TALK_TOKEN,
  ENVIRONMENT_MODE,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  SENTRY_DSN,
} from '@constants/environment.ts';
import { queryClient } from '@hooks/queries';
import * as Sentry from '@sentry/react';
import '@styles/globals.css';

import App from './App.tsx';

/**
 * Channel Talk
 * 프로덕션 환경에서만 채널톡을 활성화해요.
 */
if (IS_PRODUCTION && CHANNEL_TALK_TOKEN) {
  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: CHANNEL_TALK_TOKEN,
  });
}

/**
 * Sentry
 * 프로덕션 환경에서만 Sentry를 활성화해요.
 */
if (IS_PRODUCTION && SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT_MODE,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', API_BASE_URL],
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
        <ToastContainer />
        <ModalContainer />
      </RecoilRoot>
      {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>,
);
