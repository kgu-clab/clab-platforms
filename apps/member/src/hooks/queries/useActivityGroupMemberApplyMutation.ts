import { postActivityGroupMemberApply } from '@api/activity';
import useToast from '@hooks/common/useToast';
import { useMutation } from '@tanstack/react-query';

export const useActivityGroupMemberApplyMutation = () => {
  const toast = useToast();

  const activityGroupMemberMutation = useMutation({
    mutationFn: postActivityGroupMemberApply,
    onSuccess: () => {
      toast({
        state: 'success',
        message: '신청이 완료되었습니다.',
      });
    },
  });

  return { activityGroupMemberMutate: activityGroupMemberMutation.mutate };
};
