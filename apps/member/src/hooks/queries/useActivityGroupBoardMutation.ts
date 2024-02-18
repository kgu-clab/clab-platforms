import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { postActivityBoard } from '@api/activity';

export const useActivityGroupBoardMutation = () => {
  const queryClient = useQueryClient();

  const activityGroupBoardMutation = useMutation({
    mutationFn: postActivityBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ACTIVITY] });
    },
  });

  return {
    activityGroupBoardMutate: activityGroupBoardMutation.mutate,
  };
};
