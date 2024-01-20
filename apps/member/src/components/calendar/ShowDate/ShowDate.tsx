import dayjs from 'dayjs';
import {
  checkDate,
  MonthDate,
  checkSchedule,
} from '../calendarUtils/calendarUtils';
const now = dayjs();

const ShowDate = (year: number, month: number) => {
  const dateElements = [];
  const firstDay = dayjs(`${year}-${month}-01`).day();
  let index = 0;

  const checkedDate = checkDate(year, month);

  //전 달 날짜
  for (let i = firstDay - 1; i >= 0; i--) {
    const prevMonthDate =
      MonthDate(checkedDate.checkedYear, checkedDate.checkedMonth) - i;
    dateElements.push(
      <div
        key={index}
        className="h-20 border p-1 text-end text-sm text-gray-400"
      >
        <span>{prevMonthDate}일</span>
      </div>,
    );
    index++;
  }
  //이번 달 날짜
  for (let i = 1; i <= MonthDate(year, month); i++) {
    const element = dayjs(`${year}-${month}-${i}`);
    dateElements.push(
      <div key={index} className="h-20 border p-1 text-end text-sm">
        {/* 현재 날짜 표시 */}
        <span
          className={`${
            element.format('YY-MM-DD') === now.format('YY-MM-DD')
              ? `rounded-full bg-red-200 ${
                  now.date() < 10 ? 'px-2 py-1' : 'p-1'
                }`
              : ''
          }`}
        >
          {i}
        </span>
        일{checkSchedule(element)}
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
        <span>{i}일</span>
      </div>,
    );
    index++;
  }

  return dateElements;
};

export default ShowDate;
