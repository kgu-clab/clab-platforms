import { memo } from 'react';

import { TimeTableFilter } from '@/widgets/time-table';

function TimeTableHeader() {
  return (
    <div className="flex">
      <TimeTableFilter />
    </div>
  );
}

export default memo(TimeTableHeader);

TimeTableHeader.displayName = 'TimeTableHeader';
