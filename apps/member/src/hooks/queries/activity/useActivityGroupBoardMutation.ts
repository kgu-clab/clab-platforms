import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteActivityGroupBoards,
  patchActivityBoard,
  postActivityBoard,
} from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import { useToast } from '@hooks/common/useToast';

/**
 * 활동 그룹 게시글을 생성합니다.
 */
export function useActivityGroupBoardMutation() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const {
    mutate: activityGroupBoardMutate,
    isPending: activityGroupBoardIsPending,
  } = useMutation({
    mutationFn: postActivityBoard,
    onSuccess: (data) => {
      if (data) {
        addToast({
          state: 'success',
          message: '게시글이 작성되었습니다.',
        });
      }
      const queryKeys = [
        ACTIVITY_QUERY_KEY.BOARD({ id: data.id }),
        ACTIVITY_QUERY_KEY.BOARD({ id: data.parentId, parent: true }),
        ACTIVITY_QUERY_KEY.DETAIL(data.groupId),
        ACTIVITY_QUERY_KEY.MY_ASSIGNMENT(data.parentId),
      ];

      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });

  return {
    activityGroupBoardMutate,
    activityGroupBoardIsPending,
  };
}

/**
 * 활동 그룹 게시글을 수정합니다.
 */
export function useActivityGroupBoardPatchMutation() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const {
    mutate: activityGroupBoardPatchMutate,
    isPending: activityGroupBoardPatchIsPending,
  } = useMutation({
    mutationFn: patchActivityBoard,
    onSuccess: (data) => {
      if (data) {
        addToast({
          state: 'success',
          message: '게시글이 수정이 됐어요.',
        });
      }

      const queryKeys = [
        ACTIVITY_QUERY_KEY.BOARD({ id: data.id }),
        ACTIVITY_QUERY_KEY.BOARD({ id: data.parentId, parent: true }),
        ACTIVITY_QUERY_KEY.DETAIL(data.groupId),
        ACTIVITY_QUERY_KEY.MY_ASSIGNMENT(data.parentId),
      ];

      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });

  return {
    activityGroupBoardPatchMutate,
    activityGroupBoardPatchIsPending,
  };
}

/**
 * 활동 그룹 게시글을 삭제합니다.
 */
export function useActivityGroupBoardDeleteMutation() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteActivityGroupBoards,
    onSuccess: (data) => {
      if (data) {
        addToast({
          state: 'success',
          message: '게시글이 삭제됐어요.',
        });
      }

      const queryKeys = [
        ACTIVITY_QUERY_KEY.BOARD({ id: data.id }),
        ACTIVITY_QUERY_KEY.BOARD({ id: data.parentId, parent: true }),
        ACTIVITY_QUERY_KEY.DETAIL(data.groupId),
      ];

      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });

  return {
    activityGroupBoardDeleteMutate: mutation.mutate,
  };
}
