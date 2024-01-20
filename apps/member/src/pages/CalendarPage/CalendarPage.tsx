import CalendarSection from '@components/calendar/CalendarSection/CalendarSection';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';

const CalendarPage = () => {
  return (
    <Content>
      <Header title="C-Lab 일정" />
      <CalendarSection />
    </Content>
  );
};

export default CalendarPage;
