import { useCallback } from 'react';

import useModal from '@hooks/common/useModal';
import { formattedDate, now } from '@utils/date';
import { cn } from '@utils/string';
import dayjs from 'dayjs';

import type { ScheduleItem } from '@type/schedule';

interface CalendarScheduleProps extends ScheduleItem {
  day: dayjs.Dayjs;
}

const today = now();

const CalendarSchedule = ({
  day,
  title,
  detail,
  startDate,
  endDate,
}: CalendarScheduleProps) => {
  const { openModal } = useModal();
  const isDateDiff = dayjs(startDate).diff(endDate, 'd');
  const isBeforeToday = day.isBefore(today, 'day');

  const handleScheduleClick = useCallback(
    (detail: string, start: string, end: string) => {
      // 시작일과 종료일이 같은 경우, 종료일은 표시하지 않는다.
      const date =
        start === end
          ? `${formattedDate(start)}`
          : `${formattedDate(start)} ~ ${formattedDate(end)}`;

      openModal({
        title: '📆 일정',
        content: `일시: ${date}\n내용: ${detail}`,
      });
    },
    [openModal],
  );

  return (
    <button
      className={cn(
        'w-full truncate px-2 text-left text-xs',
        isDateDiff === 0 ? 'rounded bg-blue-100' : 'bg-red-100',
        {
          'rounded-l bg-red-100':
            isDateDiff !== 0 && day.isSame(startDate, 'date'),
        },
        {
          'bg-red-100':
            isDateDiff !== 0 &&
            day.isAfter(startDate, 'date') &&
            day.isBefore(endDate, 'date'),
        },
        {
          'rounded-r bg-red-100':
            isDateDiff !== 0 && day.isSame(endDate, 'date'),
        },
        { 'opacity-50': isBeforeToday },
      )}
      onClick={() => handleScheduleClick(detail, startDate, endDate)}
    >
      {title}
    </button>
  );
};

export default CalendarSchedule;
