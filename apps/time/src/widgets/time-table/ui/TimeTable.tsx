'use client';

import { ReactNode, memo, useContext } from 'react';

import { cn } from '@clab/utils';

import { DAY_VALUE_ARRAY } from '@/shared/constants';
import {
  DAY_PERIOD_ARRAY,
  NIGHT_PERIOD_ARRAY,
  getFormattedTime,
} from '@/widgets/time-table';
import { TimeTableContext } from '@/widgets/time-table/ui/TimeTableLayout';

interface TimeTableItemProps {
  rowHeader?: boolean;
  columnHeader?: boolean;
  children: ReactNode;
}

function TimeTableItem({
  rowHeader = false,
  columnHeader = false,
  children,
}: TimeTableItemProps) {
  return rowHeader ? (
    <th className="h-16 border border-gray-400 bg-gray-50">{children}</th>
  ) : (
    <td
      className={cn(
        'h-16 border border-gray-400 text-sm',
        columnHeader
          ? 'w-12 bg-gray-50 px-4'
          : 'cursor-pointer transition-colors hover:bg-gray-100',
      )}
    >
      {children}
    </td>
  );
}

function TimeTable() {
  const { state, action } = useContext(TimeTableContext);
  const selectedSchedule =
    state.dayStatus === 'day' ? DAY_PERIOD_ARRAY : NIGHT_PERIOD_ARRAY;

  return (
    <>
      <table className="w-full table-auto border-collapse bg-white">
        <thead className="w-full">
          <tr>
            <TimeTableItem rowHeader>교시</TimeTableItem>
            {DAY_VALUE_ARRAY.map((day) => (
              <TimeTableItem key={day} rowHeader>
                {day}
              </TimeTableItem>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedSchedule.map(([period, time]) => {
            return (
              <tr key={period} className="text-center">
                <TimeTableItem columnHeader>
                  <p>{period}교시</p>
                  <p className="hidden sm:block">
                    {getFormattedTime({
                      hour: time.start.hour,
                      minute: time.start.minute,
                    })}
                    ~
                    {getFormattedTime({
                      hour: time.end.hour,
                      minute: time.end.minute,
                    })}
                  </p>
                </TimeTableItem>
                {Array.from({ length: 5 }, (_, idx) => (
                  <TimeTableItem key={`${period}-${idx + 1}`}>
                    <button
                      type="button"
                      className="size-full"
                      onClick={() => action.buttonClickAction({ period, idx })}
                    />
                  </TimeTableItem>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default memo(TimeTable);

TimeTable.displayName = 'TimeTable';
TimeTableItem.displayName = 'TimeTableItem';
