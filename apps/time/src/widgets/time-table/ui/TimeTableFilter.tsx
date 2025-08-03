'use client';

import { useCallback } from 'react';

import { Checkbox } from '@clab-platforms/design-system';

import { DAY_STATUS, useTimeTableParams } from '@/widgets/time-table/model';
import type { DayStatus } from '@/widgets/time-table/types';
import { useRouter } from 'next/navigation';

export default function TimeTableFilter() {
  const { dayStatus, searchParamsAction } = useTimeTableParams();
  const router = useRouter();

  const handleFilterItemClick = useCallback(
    (status: DayStatus) => {
      searchParamsAction.remove('id');
      searchParamsAction.set('classType', status);
      router.push(`/timetable?${searchParamsAction.getParams()}`);
    },
    [searchParamsAction, router],
  );

  return (
    <div className="flex gap-4">
      <Checkbox
        id="time-table-filter-day"
        label={DAY_STATUS.day}
        checked={dayStatus === 'day'}
        onChange={() => handleFilterItemClick('day')}
      />
      <Checkbox
        id="time-table-filter-night"
        label={DAY_STATUS.night}
        checked={dayStatus === 'night'}
        onChange={() => handleFilterItemClick('night')}
      />
    </div>
  );
}

TimeTableFilter.displayName = 'TimeTableFilter';
