import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@styles/global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@hooks/queries';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
