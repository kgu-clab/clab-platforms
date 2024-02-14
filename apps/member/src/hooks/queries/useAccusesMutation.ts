import { postAccuses } from '@api/accuse';
import { QUERY_KEY } from '@constants/key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAccusesMutation = () => {
  const queryClient = useQueryClient();

  const AccusesPost = useMutation({
    mutationFn: postAccuses,
    onSuccess: (boardId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COMMUNITY, boardId],
      });
    },
  });

  return { accusesMutate: AccusesPost.mutate };
};
