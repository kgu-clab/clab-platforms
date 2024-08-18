import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postActivityGroup } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 활동을 생성합니다.
 */
export function useActivityGroupMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postActivityGroup,
    onSuccess: (data) => {
      if (!data) {
        toast({
          state: 'error',
          message: '활동 생성 신청에 실패했습니다.',
        });
      } else {
        toast({
          state: 'success',
          message:
            '활동 생성 신청이 완료되었습니다. 운영진 검토 후 결과가 안내될 예정입니다.',
        });
      }

      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.DETAIL(data),
      });
    },
  });

  return { activityGroupMutate: mutation.mutate };
}
