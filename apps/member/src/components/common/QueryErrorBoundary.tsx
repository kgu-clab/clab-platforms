import { type ComponentProps, type ReactNode } from 'react';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { ErrorBoundary } from '@suspensive/react';

interface Props {
  fallback: ComponentProps<typeof ErrorBoundary>['fallback'];
  children: ReactNode;
}

export default function QueryErrorBoundary({ fallback, children }: Props) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
}
