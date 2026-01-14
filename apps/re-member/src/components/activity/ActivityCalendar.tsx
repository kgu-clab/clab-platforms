import Calendar from "react-calendar";
import "./ActivityCalendar.css";
import dayjs from "dayjs";

interface ActivityCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  activeStartDate: Date;
  onActiveStartDateChange: (date: Date) => void;
}

export default function ActivityCalendar({
  value,
  onChange,
  activeStartDate,
  onActiveStartDateChange,
}: ActivityCalendarProps) {
  return (
    <Calendar
      value={value}
      onChange={(value) => {
        if (value instanceof Date) {
          onChange(value);
        }
      }}
      activeStartDate={activeStartDate}
      onActiveStartDateChange={({ activeStartDate }) => {
        if (activeStartDate) {
          onActiveStartDateChange(activeStartDate);
        }
      }}
      formatDay={(_, date) => dayjs(date).format("D")}
    />
  );
}
