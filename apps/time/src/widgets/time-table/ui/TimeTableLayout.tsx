'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { DAY_VALUE_ARRAY } from '@/shared/constants';
import { DayKor } from '@/shared/types';
import {
  DayPeriod,
  DayStatus,
  NightPeriod,
  TimeTable,
  TimeTableHeader,
  TimeTableModal,
  useTimeTableParams,
} from '@/widgets/time-table';
import { SearchParamsActionType } from '@/widgets/time-table/model/hooks/useTimeTableParams';

interface TimeTableStateContextType {
  dayStatus: DayStatus;
  period: DayPeriod | NightPeriod;
  day: DayKor | '';
}

interface TimeTableActionContextType {
  searchParamsAction: SearchParamsActionType;
  buttonClickAction: ({
    period,
    idx,
  }: {
    period: DayPeriod | NightPeriod;
    idx: number;
  }) => void;
}

export const TimeTableStateContext = createContext<TimeTableStateContextType>({
  dayStatus: 'day',
  period: '' as DayPeriod | NightPeriod,
  day: '',
});

export const TimeTableActionContext = createContext<TimeTableActionContextType>(
  {
    searchParamsAction: {} as SearchParamsActionType,
    buttonClickAction: () => {},
  },
);

export default function TimeTableLayout() {
  const { dayStatus, searchParamsAction } = useTimeTableParams();
  const [selectedDay, setSelectedDay] = useState<DayKor>();
  const [selectedPeriod, setSelectedPeriod] = useState<
    DayPeriod | NightPeriod
  >();
  const [defaultStateContextValue, setDefaultStateContextValue] =
    useState<TimeTableStateContextType>({
      dayStatus,
      period: '' as DayPeriod | NightPeriod,
      day: '',
    });

  const buttonClickAction = useCallback(
    ({ period, idx }: { period: DayPeriod | NightPeriod; idx: number }) => {
      setSelectedDay(DAY_VALUE_ARRAY[idx]);
      setSelectedPeriod(period);
    },
    [],
  );

  useEffect(() => {
    setDefaultStateContextValue({
      dayStatus,
      period: selectedPeriod!,
      day: selectedDay ?? '',
    });
  }, [dayStatus, selectedPeriod, selectedDay]);

  const defaultActionContextValue: TimeTableActionContextType = useMemo(
    () => ({
      searchParamsAction,
      buttonClickAction,
    }),
    [searchParamsAction, buttonClickAction],
  );

  return (
    <div className="flex flex-col items-center justify-center gap-y-8 p-4">
      <TimeTableStateContext.Provider value={defaultStateContextValue}>
        <TimeTableActionContext.Provider value={defaultActionContextValue}>
          <TimeTableHeader />
          <TimeTable />
          <TimeTableModal />
        </TimeTableActionContext.Provider>
      </TimeTableStateContext.Provider>
    </div>
  );
}
