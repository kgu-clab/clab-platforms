import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { patchActivityBoard } from '@api/activity';

export const useActivityGroupBoardModifyMutation = () => {
  const queryClient = useQueryClient();

  const activityGroupBoardModifyMutation = useMutation({
    mutationFn: patchActivityBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ACTIVITY] });
    },
  });

  return {
    activityGroupBoardModifyMutate: activityGroupBoardModifyMutation.mutate,
  };
};
