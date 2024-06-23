import { useCallback } from 'react';

import { cn } from '@clab/utils';

import useModal from '@hooks/common/useModal';
import { formattedDatePeriod, now } from '@utils/date';
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
    (detail: string, startDate: string, endDate: string) => {
      openModal({
        title: '📆 일정',
        content: `일시: ${formattedDatePeriod(startDate, endDate)}\n내용: ${detail}`,
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
