import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@styles/global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@hooks/queries';
import { RecoilRoot } from 'recoil';
import ToastContainer from '@components/common/Toast/ToastContainer.tsx';
import ModalContainer from '@components/common/Modal/ModalContainer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <App />
      <ToastContainer />
      <ModalContainer />
    </RecoilRoot>
  </QueryClientProvider>,
);
