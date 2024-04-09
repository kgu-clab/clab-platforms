import useModal from '@hooks/common/useModal';
import { formattedDate } from '@utils/date';
import type { ScheduleItem } from '@type/schedule';
import { useCallback } from 'react';
import { cn } from '@utils/string';
import dayjs from 'dayjs';

const CalendarSchedule = ({
  title,
  detail,
  startDate,
  endDate,
}: ScheduleItem) => {
  const { openModal } = useModal();
  const isSameDate = dayjs(startDate).isSame(endDate, 'date');

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
      className={cn('w-full px-2 text-xs text-left truncate bg-red-100', {
        'rounded bg-blue-100': isSameDate,
      })}
      onClick={() => handleScheduleClick(detail, startDate, endDate)}
    >
      {title}
    </button>
  );
};

export default CalendarSchedule;
