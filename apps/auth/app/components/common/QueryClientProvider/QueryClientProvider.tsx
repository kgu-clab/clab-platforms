'use client';

import { PropsWithChildren } from 'react';
import { queryClient } from '@hooks/queries/queryClient';
import { QueryClientProvider as OriginQueryClientProvider } from '@tanstack/react-query';

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <OriginQueryClientProvider client={queryClient}>
      {children}
    </OriginQueryClientProvider>
  );
};

export default QueryClientProvider;
