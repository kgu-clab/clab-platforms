import dayjs from 'dayjs';
import classNames from 'classnames';
import CalendarSchedule from '../CalendarSchedule/CalendarSchedule';
import { now, transformEvents } from '@utils/date';
import { useSchedule } from '@hooks/queries/useSchedule';
import { DATE_FORMAT } from '@constants/state';

interface CalendarProps {
  date: dayjs.Dayjs;
}

const Calendar = ({ date }: CalendarProps) => {
  const dateElements = [];
  const year = date.year();
  const month = date.month() + 1;
  const prevDaysInMonth = date.subtract(1, 'month').daysInMonth();
  const toDaysInMonth = date.daysInMonth();

  const { data } = useSchedule({
    start: date.startOf('month').format(DATE_FORMAT.WITH_TIME),
    end: date.endOf('month').format(DATE_FORMAT.WITH_TIME),
  });

  const events = transformEvents(data.items);

  //전 달 날짜
  for (let i = date.day(); i >= 0; i--) {
    const day = date.subtract(1, 'month');
    dateElements.push(
      <div
        key={`${day.get('year')}-${day.get('month')}-${i}`}
        className="h-20 p-1 text-sm text-gray-400 border text-end"
      >
        <p>{prevDaysInMonth - i}</p>
      </div>,
    );
  }

  //이번 달 날짜
  for (let i = 1; i <= toDaysInMonth; i++) {
    const day = dayjs(`${year}-${month}-${i}`);
    const element = day.format('YYYY-MM-DD');
    const event = events[element];
    dateElements.push(
      <div key={element} className="h-20 p-1 space-y-1 text-sm border text-end">
        <p
          className={classNames({
            'rounded-full bg-red-500 text-white':
              element === now().format('YY-MM-DD'),
          })}
        >
          {i}
        </p>
        <CalendarSchedule {...event} />
      </div>,
    );
  }

  const nextDaysInMonth = 7 - (dateElements.length % 7);

  //다음 달 날짜
  for (let i = 1; i <= nextDaysInMonth; i++) {
    const day = date.add(1, 'month');
    dateElements.push(
      <div
        key={`${day.get('year')}-${day.get('month')}-${i}`}
        className="h-20 p-1 text-sm text-gray-400 border text-end"
      >
        <p>{i}</p>
      </div>,
    );
  }

  return dateElements;
};

export default Calendar;
