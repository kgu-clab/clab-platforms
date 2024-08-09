'use client';

import { useCallback, useState } from 'react';

import { DAY_VALUE_ARRAY } from '@/shared/constants';
import type { DayKor } from '@/shared/types';
import {
  type DayPeriod,
  type NightPeriod,
  TimeTable,
  TimeTableHeader,
  TimeTableModal,
  useTimeTableParams,
} from '@/widgets/time-table';

export default function TimeTableLayout() {
  const { dayStatus } = useTimeTableParams();
  const [selectedDay, setSelectedDay] = useState<DayKor>();
  const [selectedPeriod, setSelectedPeriod] = useState<
    DayPeriod | NightPeriod
  >();

  const buttonHandler = useCallback(
    ({ period, idx }: { period: DayPeriod | NightPeriod; idx: number }) => {
      setSelectedDay(DAY_VALUE_ARRAY[idx]);
      setSelectedPeriod(period);
    },
    [],
  );

  return (
    <div className="flex flex-col items-center justify-center gap-y-8 p-4">
      <TimeTableHeader />
      <TimeTable dayStatus={dayStatus} buttonHandler={buttonHandler} />
      <TimeTableModal
        dayStatus={dayStatus}
        day={selectedDay!}
        period={selectedPeriod!}
      />
    </div>
  );
}
