'use client';

import { TimeTable, TimeTableHeader } from '@/widgets/time-table/ui';

export default function TimeTableLayout() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 py-6">
      <TimeTableHeader />
      <TimeTable />
    </div>
  );
}
