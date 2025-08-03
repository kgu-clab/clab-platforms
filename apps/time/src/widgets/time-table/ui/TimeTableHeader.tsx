import { memo } from 'react';

import { TimeTableFilter } from '@/widgets/time-table/ui';

function TimeTableHeader() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">25년 1학기</h2>
        <h2 className="font-regular text-lg">강의 시간표 (n학점)</h2>
      </div>
      <TimeTableFilter />
    </div>
  );
}

export default memo(TimeTableHeader);

TimeTableHeader.displayName = 'TimeTableHeader';
