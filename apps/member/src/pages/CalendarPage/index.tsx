import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import CalendarSection from './components/CalendarSection';
import { StatusSection } from './components/StatusSection';
import { TableSection } from './components/TableSection';

export default function CalendarPage() {
  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Header title="일정" />

        <Suspense>
          <StatusSection />
        </Suspense>

        <Suspense>
          <CalendarSection />
        </Suspense>

        <Suspense>
          <TableSection />
        </Suspense>
      </Content>
    </QueryErrorBoundary>
  );
}
