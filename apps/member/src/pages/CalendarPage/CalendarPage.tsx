import { Suspense } from 'react';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import CalendarSection from '@components/calendar/CalendarSection/CalendarSection';
import CalendarStatusSection from '@components/calendar/CalendarStatusSection/CalendarStatusSection';

const CalendarPage = () => {
  return (
    <Content>
      <Header title="일정" />
      <Suspense>
        <CalendarStatusSection />
      </Suspense>
      <Suspense>
        <CalendarSection />
      </Suspense>
    </Content>
  );
};

export default CalendarPage;
