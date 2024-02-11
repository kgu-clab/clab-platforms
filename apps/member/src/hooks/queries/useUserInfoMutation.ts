import { patchUserInfo } from '@api/member';
import { QUERY_KEY } from '@constants/key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUserInfoMutation = () => {
  const queryClient = useQueryClient();

  const userInfoMutation = useMutation({
    mutationFn: patchUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_PROFILE] });
    },
  });

  return { userInfoMutate: userInfoMutation.mutate };
};
