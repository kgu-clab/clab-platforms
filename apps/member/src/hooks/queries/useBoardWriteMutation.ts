import { postBoardsWrite } from '@api/board';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useBoardWriteMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  const boardWriteMutation = useMutation({
    mutationFn: postBoardsWrite,
    onSuccess: (res) => {
      if (!res) {
        toast({
          state: 'error',
          message: '글 작성에 실패했습니다.',
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEY.BORDER_FREE,
            QUERY_KEY.BORDER_QNA,
            QUERY_KEY.BORDER_GRADUATED,
          ],
        });
        toast({
          state: 'success',
          message: '글이 성공적으로 등록되었습니다.',
        });
      }

      navigate(-1);
    },
  });

  return { boardWriteMutate: boardWriteMutation.mutate };
};
