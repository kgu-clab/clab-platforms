import CalendarSection from '@components/calendar/CalendarSection/CalendarSection';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { Button } from '@clab/design-system';
import AddSchedule from '@components/calendar/AddSchedule/AddSchedule';
import { useState } from 'react';

const CalendarPage = () => {
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const onClickAddSchedule = () => {
    setIsAddScheduleOpen((prev) => !prev);
  };
  return (
    <Content>
      <Header title="일정">
        <Button onClick={onClickAddSchedule} size="sm">
          일정추가
        </Button>
      </Header>
      {isAddScheduleOpen && <AddSchedule />}
      <CalendarSection />
    </Content>
  );
};

export default CalendarPage;
