import { useQuery } from '@tanstack/react-query';

import { getApplyPassed } from '@/app/applicationForm/api';
import { APPLICATION_QUERY_KEY } from '@/constants';

interface Props {
  recruitmentId: number;
  studentId: string;
}

/**
 * 지원 합격 여부를 조회합니다.
 */
export function useApplyPassed({ recruitmentId, studentId }: Props) {
  const { data, isError } = useQuery({
    queryKey: APPLICATION_QUERY_KEY.RESULT(),
    queryFn: () => getApplyPassed({ recruitmentId, studentId }),
  });

  return { data, isError };
}
