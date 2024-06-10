import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postActivityPhoto } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 활동 사진을 추가합니다.
 */
export function useActivityPhotoAddMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const activityPhotoAddMutation = useMutation({
    mutationFn: postActivityPhoto,
    onSuccess: (data) => {
      if (!data) {
        return toast({
          state: 'error',
          message: '활동 사진 추가를 실패했어요.',
        });
      }

      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.PHOTOS(),
      });
      toast({
        state: 'success',
        message: '새로운 활동 사진으로 교체됐어요.',
      });
    },
  });

  return { activityPhotoAddMutate: activityPhotoAddMutation.mutate };
}
