import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUserInfo } from '@api/member';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

export const useUserInfoMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const userInfoMutation = useMutation({
    mutationFn: patchUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_PROFILE] });
      toast({ state: 'success', message: '프로필이 수정되었습니다.' });
    },
  });

  return { userInfoMutate: userInfoMutation.mutate };
};
