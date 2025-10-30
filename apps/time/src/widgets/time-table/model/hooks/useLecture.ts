'use client';

import { useCallback, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import type { GetLectureListResponseValue } from '@/widgets/time-table/api';
import { getLectureByParams } from '@/widgets/time-table/api';
import { useTimeTableParams } from '@/widgets/time-table/model';
import { timeTableQueryKeys } from '@/widgets/time-table/model';
import { useRouter } from 'next/navigation';

interface UseLectureManagerReturn {
  addLecture: (lecture: GetLectureListResponseValue) => void;
  deleteLecture: (lectureId: number) => void;
  totalTime: number;
  isLectureValid: (lecture: GetLectureListResponseValue) => boolean;
  addedLectureIds: string[];
  isLectureAdded: (lectureId: number) => boolean;
  hasTimeConflict: (time1: string, time2: string) => boolean;
}

const parseLectureTime = (time: string): string[] => {
  const periods: string[] = [];

  const timeSections = time.split(',');

  timeSections.forEach((section) => {
    const parts = section.trim().split(' ');
    const day = parts[0];
    const periodParts = parts.slice(1);

    periodParts.forEach((period) => {
      periods.push(`${day} ${period}`);
    });
  });

  return periods;
};

const hasTimeConflict = (time1: string, time2: string): boolean => {
  const periods1 = parseLectureTime(time1);
  const periods2 = parseLectureTime(time2);

  return periods1.some((period1) =>
    periods2.some((period2) => period1 === period2),
  );
};

export function useLecture(): UseLectureManagerReturn {
  const router = useRouter();
  const { searchParamsAction } = useTimeTableParams();

  const addedLectureIds = useMemo(() => {
    const params = searchParamsAction.getParams();
    return params
      .split('&')
      .filter((param) => param.startsWith('id='))
      .map((param) => param.split('=')[1]);
  }, [searchParamsAction]);

  const addedLectureIdsNumbers = useMemo(() => {
    return addedLectureIds
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id));
  }, [addedLectureIds]);

  const { data: addedLecturesData } = useQuery({
    queryKey: timeTableQueryKeys.getLectureByParams(addedLectureIdsNumbers),
    queryFn: () => getLectureByParams(addedLectureIdsNumbers),
    enabled: addedLectureIdsNumbers.length > 0,
  });

  const addedLectures = useMemo(() => {
    return addedLecturesData?.data || [];
  }, [addedLecturesData]);

  const isLectureAdded = useCallback(
    (lectureId: number): boolean => {
      return addedLectureIds.includes(lectureId.toString());
    },
    [addedLectureIds],
  );

  const addLecture = useCallback(
    (lecture: GetLectureListResponseValue) => {
      const currentParams = new URLSearchParams(window.location.search);
      const ids = currentParams.getAll('id');

      if (!ids.includes(lecture.id.toString())) {
        currentParams.append('id', lecture.id.toString());
        const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
        router.push(newUrl, { scroll: false });
      }
    },
    [router],
  );

  const deleteLecture = useCallback(
    (lectureId: number) => {
      const currentParams = new URLSearchParams(window.location.search);
      const ids = currentParams.getAll('id');
      const filteredIds = ids.filter((id) => id !== lectureId.toString());

      currentParams.delete('id');
      filteredIds.forEach((id) => currentParams.append('id', id));

      const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
      router.push(newUrl, { scroll: false });
    },
    [router],
  );

  const totalTime = useMemo(() => {
    if (!addedLectures.length) return 0;

    let totalPeriods = 0;
    addedLectures.forEach((lecture) => {
      const periods = parseLectureTime(lecture.time);
      totalPeriods += periods.length;
    });

    return totalPeriods;
  }, [addedLectures]);

  const isLectureValid = useCallback(
    (lecture: GetLectureListResponseValue) => {
      if (!addedLectures.length) return true;

      return !addedLectures.some((addedLecture) =>
        hasTimeConflict(lecture.time, addedLecture.time),
      );
    },
    [addedLectures],
  );

  return {
    addLecture,
    deleteLecture,
    totalTime,
    isLectureValid,
    addedLectureIds,
    isLectureAdded,
    hasTimeConflict,
  };
}
