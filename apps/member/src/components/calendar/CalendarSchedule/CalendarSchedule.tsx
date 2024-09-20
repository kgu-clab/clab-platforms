import { cn } from '@clab-platforms/utils';

import { useModal } from '@hooks/common/useModal';
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
  startDateTime,
  endDateTime,
}: CalendarScheduleProps) => {
  const { open } = useModal();
  const isDateDiff = dayjs(startDateTime).diff(endDateTime, 'd');
  const isBeforeToday = day.isBefore(today, 'day');

  const handleScheduleClick = (
    detail: string,
    startDateTime: string,
    endDateTime: string,
  ) => {
    open({
      title: '📆 일정',
      content: `일시: ${formattedDatePeriod(startDateTime, endDateTime)}\n내용: ${detail}`,
    });
  };

  return (
    <button
      className={cn(
        'w-full truncate px-2 text-left text-xs',
        isDateDiff === 0 ? 'rounded bg-blue-100' : 'bg-red-100',
        {
          'rounded-l bg-red-100':
            isDateDiff !== 0 && day.isSame(startDateTime, 'date'),
        },
        {
          'bg-red-100':
            isDateDiff !== 0 &&
            day.isAfter(startDateTime, 'date') &&
            day.isBefore(endDateTime, 'date'),
        },
        {
          'rounded-r bg-red-100':
            isDateDiff !== 0 && day.isSame(endDateTime, 'date'),
        },
        { 'opacity-50': isBeforeToday },
      )}
      onClick={() => handleScheduleClick(detail, startDateTime, endDateTime)}
    >
      {title}
    </button>
  );
};

export default CalendarSchedule;
