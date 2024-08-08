'use client';

import { useEffect, useMemo, useState } from 'react';

import { useClientSearchParams } from '@/shared/hooks';
import { DayStatus } from '@/widgets/time-table';
import { useRouter } from 'next/navigation';

export interface SearchParamsActionType {
  get: (key: string) => string | null;
  getParams: () => string;
  set: (key: string, value: string) => void;
  append: (key: string, value: string) => void;
  remove: (key: string) => void;
}

export default function useTimeTableParams(): {
  dayStatus: DayStatus;
  searchParams: URLSearchParams;
  searchParamsAction: SearchParamsActionType;
} {
  const [dayStatus, setDayStatus] = useState<DayStatus>('day');
  const searchParams = useClientSearchParams();
  const router = useRouter();

  const searchParamsAction = useMemo(
    () => ({
      get: (key: string) => {
        return searchParams.get(key);
      },
      getParams: () => {
        return searchParams.toString();
      },
      set: (key: string, value: string) => {
        searchParams.set(key, value);
        router.push(`/timetable?${searchParamsAction.getParams()}`);
      },
      append: (key: string, value: string) => {
        searchParams.append(key, value);
        router.push(`/timetable?${searchParamsAction.getParams()}`);
      },
      remove: (key: string) => {
        searchParams.delete(key);
        router.push(`/timetable?${searchParamsAction.getParams()}`);
      },
    }),
    [searchParams, router],
  );

  useEffect(() => {
    const currentDayStatus = searchParamsAction.get('classType');

    if (currentDayStatus !== dayStatus || !currentDayStatus) {
      searchParamsAction.set('classType', currentDayStatus ?? 'day');
      setDayStatus((currentDayStatus as DayStatus) ?? 'day');
      router.push(`/timetable?${searchParamsAction.getParams()}`);
    }
  }, [searchParams, searchParamsAction, setDayStatus, router, dayStatus]);

  return { dayStatus, searchParams, searchParamsAction };
}
