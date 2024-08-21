import { useQuery } from '@tanstack/react-query';

import {
  type GetMajorListParams,
  getMajorList,
  timeTableQueryKeys,
} from '@/widgets/time-table';

export function useMajorList({ major }: GetMajorListParams) {
  const { data } = useQuery({
    queryKey: timeTableQueryKeys.getMajorList({ major }),
    queryFn: () => getMajorList({ major }),
    enabled: major.length > 0,
  });

  return data ? data.data : [];
}
