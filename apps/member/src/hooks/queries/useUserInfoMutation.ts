import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchUserInfo } from '@api/member';
import { MEMBER_QUERY_KEY } from '@constants/key';
import { ERROR_MESSAGE } from '@constants/message';
import { useToast } from '@hooks/common/useToast';

/**
 * 회원의 정보를 수정합니다.
 */
export const useUserInfoMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const userInfoMutation = useMutation({
    mutationFn: patchUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBER_QUERY_KEY.ALL });
      addToast({ state: 'success', message: '프로필이 수정되었습니다.' });
    },
    onError: () => {
      addToast({ state: 'error', message: ERROR_MESSAGE.DEFAULT });
    },
  });

  return {
    userInfoMutate: userInfoMutation.mutate,
    isPending: userInfoMutation.isPending,
  };
};
