import { startTransition, useCallback, useState } from 'react';
import ArrowButton from '@components/common/ArrowButton/ArrowButton';
import Section from '@components/common/Section/Section';
import { useSchedule } from '@hooks/queries';
import { now, transformEvents } from '@utils/date';
import { cn } from '@utils/string';
import CalendarSchedule from '../CalendarSchedule/CalendarSchedule';

const today = now();

const CalendarSection = () => {
  const [date, setDate] = useState(today);
  const { data } = useSchedule({
    startDate: date.startOf('month').format('YYYY-MM-DD'),
    endDate: date.endOf('month').format('YYYY-MM-DD'),
  });

  const handleDateClick = useCallback((action: 'prev' | 'next' | 'today') => {
    startTransition(() => {
      setDate((current) => {
        switch (action) {
          case 'prev':
            return current.subtract(1, 'month');
          case 'next':
            return current.add(1, 'month');
          case 'today':
            return today;
        }
      });
    });
  }, []);

  const events = transformEvents(data.items);
  const startDay = date.startOf('month').startOf('week'); // 현재 월의 첫 날짜의 주의 시작일
  const endDay = date.endOf('month').endOf('week'); // 현재 월의 마지막 날짜의 주의 마지막일

  const days = [];
  let day = startDay;

  while (day.isBefore(endDay)) {
    const isToday = day.isSame(today, 'day');

    days.push(
      <td key={day.format('DD-MM-YYYY')} className="border h-28">
        <div className="flex flex-col items-end h-full space-y-1">
          <p
            className={cn('text-sm text-center rounded-full size-5 m-1', {
              'text-white bg-red-500': isToday,
            })}
          >
            {day.format('D')}
          </p>
          {events[day.format('YYYY-MM-DD')]?.map((event) => (
            <CalendarSchedule key={event.id} day={day} {...event} />
          ))}
        </div>
      </td>,
    );
    day = day.add(1, 'day');
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(<tr key={i}>{days.slice(i, i + 7)}</tr>);
  }

  return (
    <Section>
      <Section.Header title={date.format('YYYY년 MM월')}>
        <ArrowButton onClick={() => handleDateClick('prev')} />
        <button
          className="px-3 hover:underline"
          onClick={() => handleDateClick('today')}
        >
          오늘
        </button>
        <ArrowButton direction="next" onClick={() => handleDateClick('next')} />
      </Section.Header>
      <Section.Body>
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          <tbody className="border">{weeks}</tbody>
        </table>
      </Section.Body>
    </Section>
  );
};

export default CalendarSection;
