import useModal from '@hooks/common/useModal';
import { formattedDate } from '@utils/date';
import type { ScheduleItem } from '@type/schedule';

const CalendarSchedule = ({
  title,
  detail,
  startDate,
  endDate,
}: ScheduleItem) => {
  const { openModal } = useModal();

  const onClickSchedule = (detail: string, start: string, end: string) => {
    let date = `${formattedDate(start)} ~ ${formattedDate(end)}`;

    if (start === end) {
      // 시작일과 종료일이 같은 경우, 종료일은 표시하지 않는다.
      date = `${formattedDate(start)}`;
    }

    openModal({
      title: '📆 일정',
      content: `내용: ${detail}\n일시: ${date}`,
    });
  };

  return (
    <p
      className="cursor-pointer text-xs border-l-2 border-red-500 hover:bg-gray-50"
      onClick={() => onClickSchedule(detail, startDate, endDate)}
    >
      {title}
    </p>
  );
};

export default CalendarSchedule;
