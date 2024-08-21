'use client';

import { TimeTable, TimeTableHeader } from '@/widgets/time-table';

export default function TimeTableLayout() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 py-20">
      <TimeTableHeader />
      <TimeTable />
    </div>
  );
}
