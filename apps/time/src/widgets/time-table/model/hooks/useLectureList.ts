import { useSuspenseQuery } from '@tanstack/react-query';

import {
  type GetLectureListParams,
  getLectureList,
  timeTableQueryKeys,
} from '@/widgets/time-table';

export default function useLectureList({ ...params }: GetLectureListParams) {
  return useSuspenseQuery({
    queryKey: timeTableQueryKeys.getLectureList(params),
    queryFn: () => getLectureList(params),
  });
}
