import { useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';

import { DAY } from '@/shared/constants';
import type { DayKor } from '@/shared/types';
import { useTimeTableContext } from '@/widgets/time-table/context/TimeTableContext';
import * as model from '@/widgets/time-table/model';
import type * as types from '@/widgets/time-table/types';

export function useLectureFilters() {
  const { selectedTimeInfo, clearSelectedTimeInfo } = useTimeTableContext();

  const defaultValues = useMemo(
    () => ({
      dayStatus: 'day' as types.DayStatus,
      day: DAY.mon,
      period: '1' as types.DayPeriod,
    }),
    [],
  );

  const [filters, setFilters] = useState({
    selectedRegion: [
      model.REGION.campus1,
      model.REGION.campus2,
    ] as types.Region[],
    selectedGrade: [] as types.Grade[],
    selectedDay: [selectedTimeInfo?.day || defaultValues.day] as DayKor[],
    selectedPeriod: [
      (selectedTimeInfo?.period as types.DayPeriod | types.NightPeriod) ||
        defaultValues.period,
    ] as (types.DayPeriod | types.NightPeriod)[],
    selectedLectureType: [] as types.LectureKey[],
    selectedMajor: [] as string[],
    searchKeyword: '',
  });

  const createToggleHandler = useCallback(
    <T>(key: keyof typeof filters) =>
      (item: T) => {
        setFilters((prev) => {
          const currentList = prev[key] as T[];
          const itemSet = new Set(currentList);

          if (itemSet.has(item)) {
            itemSet.delete(item);
          } else {
            itemSet.add(item);
          }

          return {
            ...prev,
            [key]: Array.from(itemSet),
          };
        });
      },
    [],
  );

  const toggleRegion = createToggleHandler<types.Region>('selectedRegion');
  const toggleGrade = createToggleHandler<types.Grade>('selectedGrade');
  const toggleDay = createToggleHandler<DayKor>('selectedDay');
  const toggleLectureType = createToggleHandler<types.LectureKey>(
    'selectedLectureType',
  );
  const toggleMajor = createToggleHandler<string>('selectedMajor');

  const togglePeriod = useCallback(
    (period: types.DayPeriod | types.NightPeriod) => {
      setFilters((prev) => {
        const periodSet = new Set(prev.selectedPeriod);

        if (periodSet.has(period)) {
          periodSet.delete(period);
        } else {
          periodSet.add(period);
        }

        return {
          ...prev,
          selectedPeriod: Array.from(periodSet).sort(),
        };
      });
    },
    [],
  );

  const setSearchKeyword = useCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, searchKeyword: keyword }));
  }, []);

  useEffect(
    function useLectureFilters() {
      if (selectedTimeInfo) {
        setFilters((prev) => ({
          ...prev,
          selectedDay: [selectedTimeInfo.day],
          selectedPeriod: [
            selectedTimeInfo.period as types.DayPeriod | types.NightPeriod,
          ],
        }));
        clearSelectedTimeInfo();
      }
    },
    [selectedTimeInfo, clearSelectedTimeInfo],
  );

  return {
    ...filters,
    toggleRegion,
    toggleGrade,
    toggleDay,
    togglePeriod,
    toggleLectureType,
    toggleMajor,
    setSearchKeyword,
    defaultValues,
  };
}
