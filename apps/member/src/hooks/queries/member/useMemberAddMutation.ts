import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postAddMember } from '@api/member';
import { MEMBER_QUERY_KEY } from '@constants/key';
import { useToast } from '@hooks/common/useToast';

import { AddMemberRequestType } from '@type/manage';

/**
 * 멤버를 추가합니다.
 */
interface Params {
  reset: () => void;
}

export function useMemberAddMutation({ reset }: Params) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: (body: AddMemberRequestType) => postAddMember(body),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: MEMBER_QUERY_KEY.PAGES(),
        });
        addToast({
          state: 'success',
          message: '계정이 생성되었어요.',
        });
        reset();
      } else {
        addToast({
          state: 'error',
          message: '계정 생성에 실패했어요.',
        });
      }
    },
  });

  return { memberAddMutation: mutation.mutate };
}
