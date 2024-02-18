import { postUploadedFileAssignment } from '@api/uploadedFile';
import { useMutation } from '@tanstack/react-query';

export const useUploadedFileAssignmentMutaion = () => {
  const uploadedFileAssignmentMutaion = useMutation({
    mutationFn: postUploadedFileAssignment,
  });

  return {
    uploadedFileAssignmentMutate: uploadedFileAssignmentMutaion.mutate,
  };
};
