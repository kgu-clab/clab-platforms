import Section from '@components/common/Section/Section';
import dayjs from 'dayjs';
import { useState } from 'react';
import ShowDate from '../ShowDate/ShowDate';
import { Button } from '@clab/design-system';

const now = dayjs();

const CalendarSection = () => {
  const [year, setYear] = useState(now.get('year'));
  const [month, setMonth] = useState(now.get('month') + 1);
  const everyDay = ['일', '월', '화', '수', '목', '금', '토'];

  const onClickAddSchedule = () => {
    prompt('일정 추가하기', '추가할 일정의 정보를 입력해주세요.');
  };

  const onClickPrev = () => {
    const prevMonth = month - 1 <= 0 ? 12 : month - 1;
    const prevYear = month - 1 <= 0 ? year - 1 : year;

    setYear(prevYear);
    setMonth(prevMonth);
  };

  const onClickNext = () => {
    const nextMonth = month + 1 > 12 ? 1 : month + 1;
    const nextYear = month + 1 > 12 ? year + 1 : year;

    setYear(nextYear);
    setMonth(nextMonth);
  };

  const onClickToday = () => {
    setYear(now.get('year'));
    setMonth(now.get('month') + 1);
  };

  return (
    <Section>
      <div className="flex justify-between">
        <p className="text-2xl font-bold">
          {year}년 {month}월
        </p>
        <div className="space-x-1">
          <Button
            size="sm"
            className="rounded-md px-1 hover:font-bold"
            onClick={onClickPrev}
          >
            &lt;
          </Button>
          <Button
            size="sm"
            className="rounded-md px-4 hover:font-bold"
            onClick={onClickToday}
          >
            오늘
          </Button>
          <Button
            size="sm"
            className="rounded-md px-1 hover:font-bold"
            onClick={onClickNext}
          >
            &gt;
          </Button>
        </div>
      </div>
      <div className="my-4 grid grid-cols-7 border">
        {everyDay.map((day) => (
          <div key={day} className="border-x bg-gray-100 text-center">
            {day}
          </div>
        ))}
        {ShowDate(year, month)}
      </div>
      <Button size="sm" className="ml-auto px-4" onClick={onClickAddSchedule}>
        일정추가
      </Button>
    </Section>
  );
};

CalendarSection.propTypes = {};

export default CalendarSection;
