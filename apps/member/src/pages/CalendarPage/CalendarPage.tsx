import CalendarSection from '@components/calendar/CalendarSection/CalendarSection';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { Button } from '@clab/design-system';

const CalendarPage = () => {
  return (
    <Content>
      <Header title="일정">
        <Button size="sm">일정추가</Button>
      </Header>
      <CalendarSection />
    </Content>
  );
};

export default CalendarPage;
