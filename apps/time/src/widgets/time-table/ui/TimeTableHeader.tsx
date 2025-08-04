import { memo } from 'react';

import { useLecture } from '@/widgets/time-table/model';
import { TimeTableFilter } from '@/widgets/time-table/ui';

function TimeTableHeader() {
  const { totalTime } = useLecture();
  const now = new Date();
  const yearShort = now.getFullYear().toString().slice(-2);
  const semester = now.getMonth() + 1 >= 7 && now.getMonth() + 1 <= 11 ? 2 : 1;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">
          {yearShort}년 {semester}학기
        </h2>
        <h2 className="font-regular text-lg">강의 시간표 ({totalTime}학점)</h2>
      </div>
      <TimeTableFilter />
    </div>
  );
}

export default memo(TimeTableHeader);

TimeTableHeader.displayName = 'TimeTableHeader';
