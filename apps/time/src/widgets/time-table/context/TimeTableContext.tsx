'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';

import type { DayKor } from '@/shared/types';
import type { DayStatus } from '@/widgets/time-table/types';

interface SelectedTimeInfo {
  day: DayKor;
  period: string;
  dayStatus: DayStatus;
}

interface TimeTableContextType {
  selectedTimeInfo: SelectedTimeInfo | null;
  setSelectedTimeInfo: (timeInfo: SelectedTimeInfo | null) => void;
  clearSelectedTimeInfo: () => void;
}

const TimeTableContext = createContext<TimeTableContextType | undefined>(
  undefined,
);

interface TimeTableProviderProps {
  children: ReactNode;
}

export function TimeTableProvider({ children }: TimeTableProviderProps) {
  const [selectedTimeInfo, setSelectedTimeInfo] =
    useState<SelectedTimeInfo | null>(null);

  const clearSelectedTimeInfo = () => {
    setSelectedTimeInfo(null);
  };

  return (
    <TimeTableContext.Provider
      value={{
        selectedTimeInfo,
        setSelectedTimeInfo,
        clearSelectedTimeInfo,
      }}
    >
      {children}
    </TimeTableContext.Provider>
  );
}

export function useTimeTableContext() {
  const context = useContext(TimeTableContext);
  if (context === undefined) {
    throw new Error(
      'useTimeTableContext must be used within a TimeTableProvider',
    );
  }
  return context;
}
