import { useMutation } from '@tanstack/react-query';

import { postApplication } from '../api';

interface Props {
  setIsApplySuccess: (applySuccess: boolean) => void;
}

export const useApplicationMutation = ({ setIsApplySuccess }: Props) => {
  const ApplicationPost = useMutation({
    mutationFn: postApplication,
    onSuccess: (data) => {
      if (data.success) {
        setIsApplySuccess(true);
      } else {
        setIsApplySuccess(false);
      }
    },
    onError: () => {
      setIsApplySuccess(false);
    },
  });

  return { applicationMutate: ApplicationPost.mutate };
};
