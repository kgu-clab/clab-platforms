'use client';

import { ReactNode, memo } from 'react';

import { cn } from '@clab-platforms/utils';

import { DAY_VALUE_ARRAY, MODAL_KEY } from '@/shared/constants';
import { useModalAction } from '@/shared/hooks';
import {
  DAY_PERIOD_ARRAY,
  type DayPeriod,
  type DayStatus,
  NIGHT_PERIOD_ARRAY,
  type NightPeriod,
  getFormattedTime,
} from '@/widgets/time-table';

interface TimeTableProps {
  dayStatus: DayStatus;
  handleTimeTableButton: ({
    period,
    idx,
  }: {
    period: DayPeriod | NightPeriod;
    idx: number;
  }) => void;
}

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

function TimeTable({ dayStatus, handleTimeTableButton }: TimeTableProps) {
  const selectedSchedule =
    dayStatus === 'day' ? DAY_PERIOD_ARRAY : NIGHT_PERIOD_ARRAY;
  const { open } = useModalAction({ key: MODAL_KEY.timeTable });

  return (
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
                    onClick={() => {
                      handleTimeTableButton({
                        period: period as DayPeriod | NightPeriod,
                        idx,
                      });
                      open();
                    }}
                  />
                </TimeTableItem>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default memo(TimeTable);

TimeTable.displayName = 'TimeTable';
TimeTableItem.displayName = 'TimeTableItem';
