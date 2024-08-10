import { useState } from 'react';

import { Input } from '@clab/design-system';

import Modal from '@components/common/Modal/Modal';
import Textarea from '@components/common/Textarea/Textarea';

import useModal from '@hooks/common/useModal';
import useToast from '@hooks/common/useToast';
import { useActivityGroupBoardPatchMutation } from '@hooks/queries/activity/useActivityGroupBoardMutation';

import type { ActivityBoardType } from '@type/activity';

interface Props {
  prevData: ActivityBoardType;
}

const ActivityBoardEditModal = ({ prevData }: Props) => {
  const { closeModal } = useModal();
  const toast = useToast();
  const [detail, setDetail] = useState<ActivityBoardType>(prevData);
  const { activityGroupBoardPatchMutate } =
    useActivityGroupBoardPatchMutation();

  const handleBoardChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditButtonClick = () => {
    if (!detail.title || !detail.content) {
      return toast({
        state: 'error',
        message: '제목과 내용을 입력해주세요.',
      });
    }
    activityGroupBoardPatchMutate({
      activityGroupBoardId: prevData.id,
      body: {
        category: detail.category,
        title: detail.title,
        content: detail.content,
      },
    });
  };

  return (
    <Modal>
      <Modal.Header>수정하기</Modal.Header>
      <Modal.Body className="space-y-3">
        <Input
          name="title"
          id="title"
          value={detail.title}
          onChange={handleBoardChange}
          placeholder={detail.title}
        />
        <Textarea
          name="content"
          id="content"
          value={detail.content}
          onChange={handleBoardChange}
          placeholder={detail.content}
        />
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button color="orange" onClick={handleEditButtonClick}>
          변경
        </Modal.Button>
        <Modal.Button color="gray" onClick={closeModal}>
          취소
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActivityBoardEditModal;
