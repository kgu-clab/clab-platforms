import { postCommunityWrite } from '@api/community';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useCommunityWriteMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  const communityWriteMutation = useMutation({
    mutationFn: postCommunityWrite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COMMUNITY] });
      toast({
        state: 'success',
        message: '글이 성공적으로 등록되었습니다.',
      });
      navigate(-1);
    },
  });

  return { communityWriteMutate: communityWriteMutation.mutate };
};
