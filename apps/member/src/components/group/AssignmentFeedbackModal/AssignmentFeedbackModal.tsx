import { useEffect, useState } from 'react';

import File from '@components/common/File/File';
import Modal from '@components/common/Modal/Modal';
import Textarea from '@components/common/Textarea/Textarea';

import useModal from '@hooks/common/useModal';
import useToast from '@hooks/common/useToast';
import {
  useActivityGroupBoardMutation,
  useActivityGroupBoardPatchMutation,
  useMyProfile,
} from '@hooks/queries';

import type { ActivityBoardType } from '@type/activity';

interface AssignmentFeedbackModalProps {
  post: ActivityBoardType;
  groupId: number;
  assignmentId: number;
}

const AssignmentFeedbackModal = ({
  post,
  groupId,
  assignmentId,
}: AssignmentFeedbackModalProps) => {
  const { closeModal } = useModal();
  const toast = useToast();
  const [feedback, setFeedback] = useState('');
  const { data: myProfile } = useMyProfile();
  const { activityGroupBoardMutate, activityGroupBoardIsPending } =
    useActivityGroupBoardMutation();
  const { activityGroupBoardPatchMutate, activityGroupBoardPatchIsPending } =
    useActivityGroupBoardPatchMutation();

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };
  const handleFeedbackUploadClick = () => {
    if (feedback === '') {
      return toast({
        state: 'error',
        message: '내용을 입력해주세요.',
      });
    }
    if (post.children?.[0]) {
      activityGroupBoardPatchMutate({
        groupId: groupId,
        groupBoardId: assignmentId,
        activityGroupBoardId: post.children[0].id,
        body: {
          category: 'FEEDBACK',
          content: feedback,
        },
      });
    } else {
      activityGroupBoardMutate({
        parentId: post?.id,
        activityGroupId: groupId,
        memberId: myProfile.id,
        body: {
          category: 'FEEDBACK',
          content: feedback,
        },
      });
    }
    closeModal();
  };

  useEffect(() => {
    if (post.children?.length) {
      setFeedback(post.children?.[0].content);
    }
  }, [post]);

  return (
    <Modal>
      <Modal.Header>피드백 작성하기</Modal.Header>
      <Modal.Body className="space-y-8">
        <div className="space-y-2">
          {post.files
            ? post.files.map((file) => (
                <div key={file.fileUrl} className="flex gap-2">
                  <p>제출 파일 | </p>
                  <File href={file.fileUrl}>{file.originalFileName}</File>
                </div>
              ))
            : '-'}
          <hr />
          <p>{post.content}</p>
        </div>
        <Textarea
          id="feedback"
          label="피드백"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="내용을 입력해주세요"
        />
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button
          color="orange"
          onClick={handleFeedbackUploadClick}
          disabled={
            activityGroupBoardIsPending || activityGroupBoardPatchIsPending
          }
        >
          입력
        </Modal.Button>
        <Modal.Button color="gray" onClick={closeModal}>
          취소
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignmentFeedbackModal;
