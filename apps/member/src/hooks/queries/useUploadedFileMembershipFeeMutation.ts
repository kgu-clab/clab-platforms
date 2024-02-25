import { postUploadedFileMembershipFee } from '@api/uploadedFile';
import { QUERY_KEY } from '@constants/key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadedFileMembershipFeeMutation = () => {
  const queryClient = useQueryClient();

  const uploadedFileMembershipFeeMutation = useMutation({
    mutationFn: postUploadedFileMembershipFee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.UPLOADEDFILE],
      });
    },
  });

  return {
    uploadedFileMembershipFeeMutate: uploadedFileMembershipFeeMutation.mutate,
  };
};
