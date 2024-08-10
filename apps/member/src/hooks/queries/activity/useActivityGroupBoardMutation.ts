import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteActivityGroupBoards,
  patchActivityBoard,
  postActivityBoard,
} from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 활동 그룹 게시글을 생성합니다.
 */
export function useActivityGroupBoardMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postActivityBoard,
    onSuccess: (data) => {
      if (data) {
        toast({
          state: 'success',
          message: '게시글이 작성되었습니다.',
        });
      }

      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.MY_ASSIGNMENT(data.id),
      });
    },
  });

  return {
    activityGroupBoardMutate: mutation.mutate,
  };
}

/**
 * 활동 그룹 게시글을 수정합니다.
 */
export function useActivityGroupBoardPatchMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: patchActivityBoard,
    onSuccess: (data) => {
      if (data) {
        toast({
          state: 'success',
          message: '게시글이 수정이 됐어요.',
        });
      }

      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.MY_ASSIGNMENT(data.id),
      });
    },
  });

  return {
    activityGroupBoardPatchMutate: mutation.mutate,
  };
}

/**
 * 활동 그룹 게시글을 삭제합니다.
 */
export function useActivityGroupBoardDeleteMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: deleteActivityGroupBoards,
    onSuccess: (data) => {
      if (data) {
        toast({
          state: 'success',
          message: '게시글이 삭제됐어요.',
        });
      }

      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.BOARD(data),
      });
    },
  });

  return {
    activityGroupBoardDeleteMutate: mutation.mutate,
  };
}
