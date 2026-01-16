import type { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";
import { RiArrowDropLeftFill, RiArrowDropRightFill } from "react-icons/ri";

interface ActivityCalendarHeaderProps {
  currentMonth: Date;
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
}

export default function ActivityCalendarHeader({
  currentMonth,
  setCurrentMonth,
}: ActivityCalendarHeaderProps) {
  const handlePrevMonth = () => {
    setCurrentMonth(dayjs(currentMonth).subtract(1, "month").toDate());
  };
  const handleNextMonth = () => {
    setCurrentMonth(dayjs(currentMonth).add(1, "month").toDate());
  };

  return (
    <div className="flex items-center justify-between">
      <span>{dayjs(currentMonth).format("YYYY년 M월")}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => handlePrevMonth()}>
          <RiArrowDropLeftFill size={24} />
        </button>
        <button onClick={handleNextMonth}>
          <RiArrowDropRightFill size={24} />
        </button>
      </div>
    </div>
  );
}
