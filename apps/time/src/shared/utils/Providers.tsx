'use client';

import { PropsWithChildren } from 'react';

import { Provider } from 'jotai';

export default function Providers({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>;
}
