import Section from '@components/common/Section/Section';
import dayjs from 'dayjs';
import { startTransition, useState } from 'react';
import Calendar from '../Calendar/Calendar';

const now = dayjs();
const everyDay = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarSection = () => {
  const [year, setYear] = useState(now.get('year'));
  const [month, setMonth] = useState(now.get('month') + 1);

  const onClickPrev = () => {
    startTransition(() => {
      const prevMonth = month - 1 <= 0 ? 12 : month - 1;
      const prevYear = month - 1 <= 0 ? year - 1 : year;

      setYear(prevYear);
      setMonth(prevMonth);
    });
  };

  const onClickNext = () => {
    startTransition(() => {
      const nextMonth = month + 1 > 12 ? 1 : month + 1;
      const nextYear = month + 1 > 12 ? year + 1 : year;

      setYear(nextYear);
      setMonth(nextMonth);
    });
  };

  const onClickToday = () => {
    startTransition(() => {
      setYear(now.get('year'));
      setMonth(now.get('month') + 1);
    });
  };

  return (
    <Section>
      <Section.Header title={`${year}년 ${month}월`}>
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
      <Section.Body className="grid grid-cols-7 border-t">
        {everyDay.map((day) => (
          <div key={day} className="border-x bg-gray-100 text-center">
            {day}
          </div>
        ))}
        <Calendar year={year} month={month} />
      </Section.Body>
    </Section>
  );
};

export default CalendarSection;
