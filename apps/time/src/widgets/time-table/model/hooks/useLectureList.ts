import { useInfiniteQuery } from '@tanstack/react-query';

import {
  type GetLectureListParams,
  getLectureList,
  timeTableQueryKeys,
} from '@/widgets/time-table';

export default function useLectureList({ ...params }: GetLectureListParams) {
  return useInfiniteQuery({
    queryKey: timeTableQueryKeys.getLectureList(params),
    queryFn: ({ pageParam }) =>
      getLectureList({ ...params, cursor: pageParam }),
    initialPageParam: 0,
    select: (data) => (data.pages ?? []).flatMap((page) => page.data.values),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext
        ? lastPage.data.values[params.limit - 1].id
        : undefined,
  });
}
