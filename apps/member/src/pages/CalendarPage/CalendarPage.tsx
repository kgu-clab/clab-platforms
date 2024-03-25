import { startTransition, useState } from 'react';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import Calendar from '@components/calendar/Calendar/Calendar';
import { now } from '@utils/date';
import { Dayjs } from 'dayjs';

const today = now();

const CalendarPage = () => {
  const [date, setDate] = useState<Dayjs>(today);
  const onClickPrev = () => {
    startTransition(() => {
      setDate((prev) => prev.subtract(1, 'month'));
    });
  };

  const onClickNext = () => {
    startTransition(() => {
      setDate((prev) => prev.add(1, 'month'));
    });
  };

  const onClickToday = () => {
    startTransition(() => {
      setDate(today);
    });
  };

  return (
    <Content>
      <Header title="일정" />
      <Section>
        <Section.Header title={date.format('YYYY년 MM월')}>
          <button className="hover:font-semibold" onClick={onClickPrev}>
            &lt;
          </button>
          <button className="px-3 hover:font-semibold" onClick={onClickToday}>
            오늘
          </button>
          <button className="hover:font-semibold" onClick={onClickNext}>
            &gt;
          </button>
        </Section.Header>
        <Section.Body className="grid grid-cols-7">
          <Calendar date={date} />
        </Section.Body>
      </Section>
    </Content>
  );
};

export default CalendarPage;
