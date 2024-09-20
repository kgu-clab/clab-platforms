import { Suspense } from 'react';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import {
  SupportHistorySection,
  SupportHistorySectionSkeleton,
} from '@components/support/SupportHistorySection';

import { GlobalErrorPage } from '@pages/GlobalErrorPage';
import { ErrorBoundary } from '@suspensive/react';

import { IntroduceSection } from './components/IntroduceSection';
import { RequestSection } from './components/RequestSection';

export default function SupportPage() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallback={<GlobalErrorPage />}>
          <Content>
            <Header title="회비" />
            <IntroduceSection />
            <RequestSection />
            <Suspense fallback={<SupportHistorySectionSkeleton />}>
              <SupportHistorySection />
            </Suspense>
          </Content>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
