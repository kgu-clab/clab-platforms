import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';

import CalendarSection from './components/CalendarSection';
import { StatusSection } from './components/StatusSection';
import { TableSection } from './components/TableSection';

export default function CalendarPage() {
  return (
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
  );
}
