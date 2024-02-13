import { postAccuses } from '@api/accuse';
import { QUERY_KEY } from '@constants/key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAccuses = () => {
  const queryClient = useQueryClient();

  const AccusesPost = useMutation({
    mutationFn: postAccuses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ACCUSES] });
    },
  });

  return { accusesData: AccusesPost.mutate };
};
