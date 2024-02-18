import { postUploadedFileAssignment } from '@api/uploadedFile';
import { useMutation } from '@tanstack/react-query';

export const useUploadedFileAssignmentMutation = () => {
  const uploadedFileAssignmentMutation = useMutation({
    mutationFn: postUploadedFileAssignment,
  });

  return {
    uploadedFileAssignmentMutate: uploadedFileAssignmentMutation.mutate,
  };
};
