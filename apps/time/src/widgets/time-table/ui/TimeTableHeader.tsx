import { TimeTableFilter } from '@/widgets/time-table';

export default function TimeTableHeader() {
  return (
    <div className="flex">
      <TimeTableFilter />
    </div>
  );
}

TimeTableHeader.displayName = 'TimeTableHeader';
