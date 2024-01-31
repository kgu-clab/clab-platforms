import dayjs from 'dayjs';
import schedule from '@mocks/data/schedule.json';

interface CalendarScheduleProps {
  date: dayjs.Dayjs;
}

const CalendarSchedule = ({ date }: CalendarScheduleProps) => {
  const checkedDate = dayjs(date).startOf('day');

  const onClickSchedule = (detail: string, start: string, end: string) => {
    alert(`${detail}\n${start} ~ ${end}`);
  };

  return schedule.map(({ title, detail, startDate, endDate }, index) => {
    const start = dayjs(startDate).startOf('day');
    const end = dayjs(endDate).endOf('day');

    if (
      checkedDate.isSame(start) ||
      checkedDate.isSame(end) ||
      (checkedDate.isAfter(start) && checkedDate.isBefore(end))
    ) {
      return (
        <p
          key={index}
          className="cursor-pointer text-xs border-l-2 border-red-500 hover:bg-gray-50"
          onClick={() => onClickSchedule(detail, startDate, endDate)}
        >
          {title}
        </p>
      );
    }
  });
};

export default CalendarSchedule;
