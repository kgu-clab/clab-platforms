import dayjs from 'dayjs';
import classNames from 'classnames';
import CalendarSchedule from '../CalendarSchedule/CalendarSchedule';
import { checkDate, monthDate } from './Calendar.utils';

const now = dayjs();

interface CalendarProps {
  year: number;
  month: number;
}

const Calendar = ({ year, month }: CalendarProps) => {
  const dateElements = [];
  const firstDay = dayjs(`${year}-${month}-01`).day();
  let index = 0;

  const checkedDate = checkDate(year, month);

  //전 달 날짜
  for (let i = firstDay - 1; i >= 0; i--) {
    const prevMonthDate =
      monthDate(checkedDate.checkedYear, checkedDate.checkedMonth) - i;
    dateElements.push(
      <div
        key={index}
        className="h-20 border p-1 text-end text-sm text-gray-400"
      >
        <span>{prevMonthDate}</span>
      </div>,
    );
    index++;
  }

  //이번 달 날짜
  for (let i = 1; i <= monthDate(year, month); i++) {
    const element = dayjs(`${year}-${month}-${i}`);
    dateElements.push(
      <div key={index} className="h-20 border p-1 text-end text-sm space-y-1">
        <span
          className={classNames({
            'rounded-full bg-red-500 text-white':
              element.format('YY-MM-DD') === now.format('YY-MM-DD'),
          })}
        >
          {i}
        </span>
        <CalendarSchedule date={element} />
      </div>,
    );
    index++;
  }

  //다음 달 날짜
  for (let i = 1; index % 7 !== 0; i++) {
    dateElements.push(
      <div
        key={index}
        className="h-20 border p-1 text-end text-sm text-gray-400"
      >
        <span>{i}</span>
      </div>,
    );
    index++;
  }

  return dateElements;
};

export default Calendar;
