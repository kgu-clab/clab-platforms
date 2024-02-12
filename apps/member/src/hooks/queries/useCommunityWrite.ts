import { postCommunityWrite } from '@api/community';
import { QUERY_KEY } from '@constants/key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCommunityWrite = () => {
  const queryClient = useQueryClient();

  const communityWriteMutation = useMutation({
    mutationFn: postCommunityWrite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COMMUNITY] });
    },
  });

  return { communityWriteMutate: communityWriteMutation.mutate };
};
