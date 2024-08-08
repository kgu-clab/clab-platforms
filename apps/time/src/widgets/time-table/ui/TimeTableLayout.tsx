'use client';

import { createContext, useCallback, useState } from 'react';

import { DAY_VALUE_ARRAY } from '@/shared/constants';
import { DayKor } from '@/shared/types';
import {
  DayStatus,
  TimeTable,
  TimeTableHeader,
  TimeTableModal,
  useTimeTableParams,
} from '@/widgets/time-table';
import { SearchParamsActionType } from '@/widgets/time-table/model/hooks/useTimeTableParams';

interface TimeTableContextType {
  state: {
    dayStatus: DayStatus;
    period: string;
    day: DayKor | '';
    modalVisible: boolean;
  };
  action: {
    searchParamsAction: SearchParamsActionType;
    buttonClickAction: ({
      period,
      idx,
    }: {
      period: string;
      idx: number;
    }) => void;
    modalCloseAction: () => void;
  };
}

export const TimeTableContext = createContext<TimeTableContextType>({
  state: { dayStatus: 'day', period: '', day: '', modalVisible: false },
  action: {
    searchParamsAction: {} as SearchParamsActionType,
    buttonClickAction: () => {},
    modalCloseAction: () => {},
  },
});

export default function TimeTableLayout() {
  const { dayStatus, searchParamsAction } = useTimeTableParams();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<DayKor>();
  const [selectedPeriod, setSelectedPeriod] = useState<string>();

  const buttonClickAction = useCallback(
    ({ period, idx }: { period: string; idx: number }) => {
      setSelectedDay(DAY_VALUE_ARRAY[idx]);
      setSelectedPeriod(period);
      setVisible(true);
    },
    [setSelectedDay, setSelectedPeriod, setVisible],
  );

  const modalCloseAction = useCallback(() => {
    setSelectedDay(undefined);
    setSelectedPeriod(undefined);
    setVisible(false);
  }, [setVisible]);

  const defaultContextValue: TimeTableContextType = {
    state: {
      dayStatus,
      period: selectedPeriod ?? '',
      day: selectedDay ?? '',
      modalVisible: visible,
    },
    action: { searchParamsAction, buttonClickAction, modalCloseAction },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-8 p-4">
      <TimeTableContext.Provider value={defaultContextValue}>
        <TimeTableHeader />
        <TimeTable />
        {visible && <TimeTableModal />}
      </TimeTableContext.Provider>
    </div>
  );
}
