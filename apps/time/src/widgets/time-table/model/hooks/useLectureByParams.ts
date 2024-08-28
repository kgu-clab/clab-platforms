import { useQuery } from '@tanstack/react-query';

import { getLectureByParams } from '@/widgets/time-table/api';
import {
  getFormattedLectureList,
  timeTableQueryKeys,
  useTimeTableParams,
} from '@/widgets/time-table/model';
import { useRouter } from 'next/navigation';

export function useLectureByParams(idList: number[]) {
  const { searchParamsAction } = useTimeTableParams();
  const { dayStatus } = useTimeTableParams();
  const router = useRouter();
  const { data, isError } = useQuery({
    queryKey: timeTableQueryKeys.getLectureByParams(idList),
    queryFn: idList.length
      ? () => getLectureByParams(idList)
      : () => Promise.resolve(null),
    enabled: !!idList.length,
  });
  const reset = () => {
    searchParamsAction.remove('id');
    alert('강의 정보를 찾지 못해 시간표 데이터를 초기화합니다.');
    router.push(`/timetable?${searchParamsAction.getParams()}`);
  };

  if (isError) {
    reset();
  }

  const { basicLectureGroup, specialLectureGroup, error } =
    getFormattedLectureList({
      dayStatus,
      values: data?.data,
    });

  if (error) {
    reset();
  }

  return { basicLectureGroup, specialLectureGroup };
}
