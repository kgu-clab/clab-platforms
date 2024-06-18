import { startTransition, useState } from 'react';

import { cn } from '@clab/utils';

import ArrowButton from '@components/common/ArrowButton/ArrowButton';
import Section from '@components/common/Section/Section';

import { useSchedule } from '@hooks/queries';
import { now, transformEvents } from '@utils/date';

import CalendarSchedule from '../CalendarSchedule/CalendarSchedule';

const today = now();

const CalendarSection = () => {
  const [date, setDate] = useState(today);
  const { data } = useSchedule({
    startDate: date.startOf('month').toString(),
    endDate: date.endOf('month').toString(),
  });

  const handleDateClick = (action: 'prev' | 'next' | 'today') => {
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
  };

  const events = transformEvents(data.items);
  const startDay = date.startOf('month').startOf('week'); // 현재 월의 첫 날짜의 주의 시작일
  const endDay = date.endOf('month').endOf('week'); // 현재 월의 마지막 날짜의 주의 마지막일

  const days = [];
  let day = startDay;

  while (day.isBefore(endDay)) {
    const isToday = day.isSame(today, 'day');
    const isBeforeToday = day.isBefore(today, 'day');

    days.push(
      <td key={day.format('DD-MM-YYYY')} className="h-28 border">
        <div
          className={cn('flex h-full flex-col items-end gap-1', {
            'bg-gray-50 opacity-60': isBeforeToday,
          })}
        >
          <p
            className={cn('m-1 size-5 rounded-full text-center text-sm', {
              'bg-red-500 text-white': isToday,
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
