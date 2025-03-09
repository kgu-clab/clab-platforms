import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postRecruitmentCreate } from '@api/recruitment';
import { RECRUITMENT_QUERY_KEY } from '@constants/key';
import { useToast } from '@hooks/common/useToast';

/**
 * 모집 공고를 생성합니다.
 */
export function useRecruitmentCreateMutation() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: postRecruitmentCreate,
    onSuccess: () => {
      addToast({
        state: 'success',
        message: '모집 공고 등록이 완료되었어요.',
      });

      queryClient.invalidateQueries({
        queryKey: RECRUITMENT_QUERY_KEY.LIST(),
      });
    },
  });
}
