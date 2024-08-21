import { memo } from 'react';

import { TimeTableFilter, TimeTableUtilButtons } from '@/widgets/time-table';

function TimeTableHeader() {
  return (
    <div className="flex w-full items-center justify-between">
      <h2 className="text-xl font-bold">정규 시간표</h2>
      <TimeTableFilter />
      <TimeTableUtilButtons />
    </div>
  );
}

export default memo(TimeTableHeader);

TimeTableHeader.displayName = 'TimeTableHeader';
