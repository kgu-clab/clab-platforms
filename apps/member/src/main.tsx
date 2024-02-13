import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@styles/global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@hooks/queries';
import { RecoilRoot } from 'recoil';
import ModalContainer from '@components/common/ModalContainer/ModalContainer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
        <ModalContainer />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
