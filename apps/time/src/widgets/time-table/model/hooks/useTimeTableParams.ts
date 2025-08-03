'use client';

import { useEffect, useState } from 'react';

import { PATH } from '@/shared/constants';
import { useEditableSearchParams } from '@/shared/hooks';
import type { DayStatus } from '@/widgets/time-table/types';
import { useRouter } from 'next/navigation';

export interface SearchParamsActionType {
  get: (key: string) => string | null;
  getAll: (key: string) => string[];
  getParams: () => string;
  set: (key: string, value: string) => void;
  append: (key: string, value: string) => void;
  remove: (key: string) => void;
}

export function useTimeTableParams(): {
  dayStatus: DayStatus;
  searchParams: URLSearchParams;
  searchParamsAction: SearchParamsActionType;
} {
  const [dayStatus, setDayStatus] = useState<DayStatus>('day');
  const searchParams = useEditableSearchParams();
  const router = useRouter();

  const searchParamsAction = {
    get: (key: string) => {
      return searchParams.get(key);
    },
    getAll: (key: string) => {
      return searchParams.getAll(key);
    },
    getParams: () => {
      return searchParams.toString();
    },
    set: (key: string, value: string) => {
      searchParams.set(key, value);
      router.push(`${PATH.TIMETABLE}?${searchParams.toString()}`);
    },
    append: (key: string, value: string) => {
      searchParams.append(key, value);
      router.push(`${PATH.TIMETABLE}?${searchParams.toString()}`);
    },
    remove: (key: string) => {
      searchParams.delete(key);
      router.push(`${PATH.TIMETABLE}?${searchParams.toString()}`);
    },
  };

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
