'use client';

import { PropsWithChildren } from 'react';

import { QueryClientProvider as OriginQueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@hooks/queries/queryClient';

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <OriginQueryClientProvider client={queryClient}>
      {children}
    </OriginQueryClientProvider>
  );
};

export default QueryClientProvider;
