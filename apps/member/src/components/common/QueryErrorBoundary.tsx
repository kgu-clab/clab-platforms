import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { ErrorBoundary } from '@suspensive/react';

interface Props {
  fallback: React.ComponentProps<typeof ErrorBoundary>['fallback'];
  children: React.ReactNode;
}

export default function QueryErrorBoundary({ fallback, children }: Props) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
}
