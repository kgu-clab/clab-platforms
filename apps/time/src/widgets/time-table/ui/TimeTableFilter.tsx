'use client';

import { ReactNode, useCallback, useContext } from 'react';

import { cn } from '@clab/utils';

import { DAY_STATUS, DayStatus } from '@/widgets/time-table';
import {
  TimeTableActionContext,
  TimeTableStateContext,
} from '@/widgets/time-table/ui/TimeTableLayout';

interface TimeTableFilterItemProps {
  children: ReactNode;
  onClick?: () => void;
  selected: boolean;
}

function TimeTableFilterItem({
  children,
  onClick,
  selected,
}: TimeTableFilterItemProps) {
  return (
    <button
      className={cn(
        'rounded-full px-4 py-2 transition-colors ',
        selected ? 'bg-gray-200' : 'hover:bg-gray-100',
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function TimeTableFilter() {
  const { dayStatus } = useContext(TimeTableStateContext);
  const { searchParamsAction } = useContext(TimeTableActionContext);

  const onClickHandler = useCallback(
    (status: DayStatus) => {
      searchParamsAction.set('classType', status);
    },
    [searchParamsAction],
  );

  return (
    <div className="flex gap-4 rounded-full border border-gray-300 bg-white p-1">
      <TimeTableFilterItem
        selected={dayStatus === 'day'}
        onClick={() => onClickHandler('day')}
      >
        {DAY_STATUS.day}
      </TimeTableFilterItem>
      <TimeTableFilterItem
        selected={dayStatus === 'night'}
        onClick={() => onClickHandler('night')}
      >
        {DAY_STATUS.night}
      </TimeTableFilterItem>
    </div>
  );
}

TimeTableFilter.displayName = 'TimeTableFilter';
