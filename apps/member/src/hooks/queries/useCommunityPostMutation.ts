import { patchCommunityPost } from '@api/community';
import { QUERY_KEY } from '@constants/key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCommunityPostMutation = () => {
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: patchCommunityPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COMMUNITY] });
    },
  });

  return { postMutate: postMutation.mutate };
};
