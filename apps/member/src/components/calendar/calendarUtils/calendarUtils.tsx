import dayjs from 'dayjs';
import schedule from '@mocks/data/schedule.json';

export const MonthDate = (year: number, month: number) => {
  if (month === 2) return year % 4 === 0 || year % 400 === 0 ? 29 : 28;
  else if (month < 8) return month % 2 !== 0 ? 31 : 30;
  else return month % 2 === 0 ? 31 : 30;
};

export const checkDate = (year: number, month: number) => {
  let checkedMonth = month;
  let checkedYear = year;
  switch (month) {
    case 1:
      checkedMonth = 1;
      checkedYear--;
      break;
    case 12:
      checkedMonth = 1;
      checkedYear++;
      break;
    default:
      checkedMonth--;
  }
  return { checkedYear, checkedMonth };
};

export const checkSchedule = (checked: dayjs.Dayjs) => {
  const checkedDate = dayjs(checked).startOf('day');

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
        <div
          key={index}
          className="mb-1 rounded-sm bg-yellow-100 text-xs text-gray-600"
          onClick={() => onClickSchedule(detail, startDate, endDate)}
        >
          {title}
        </div>
      );
    }
  });
};
