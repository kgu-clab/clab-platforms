import { useRef, useState } from 'react';

import { Button, Input } from '@clab/design-system';
import { cn } from '@clab/utils';

import File from '@components/common/File/File';
import Modal from '@components/common/Modal/Modal';
import Textarea from '@components/common/Textarea/Textarea';

import { FORM_DATA_KEY } from '@constants/api';
import useModal from '@hooks/common/useModal';
import useToast from '@hooks/common/useToast';
import { useActivityGroupBoardPatchMutation } from '@hooks/queries/activity/useActivityGroupBoardMutation';

import type { ActivityBoardType } from '@type/activity';
import { ResponseFile } from '@type/api';

interface Props {
  prevData: ActivityBoardType;
  groupId: number;
}
interface FileUploaderProps {
  uploadedFile: ResponseFile | null;
  uploaderRef: React.RefObject<HTMLInputElement>;
  handleDeleteFileClick: () => void;
}

const ActivityBoardEditModal = ({ prevData, groupId }: Props) => {
  const { closeModal } = useModal();
  const toast = useToast();
  const [board, setBoard] = useState<ActivityBoardType>(prevData);

  const uploaderRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<ResponseFile | null>(
    prevData?.files?.[0] || null,
  );
  const { activityGroupBoardPatchMutate } =
    useActivityGroupBoardPatchMutation();

  const handleBoardChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBoard((prev) => ({ ...prev, [name]: value }));
  };
  const handleDeleteFileClick = () => {
    setUploadedFile(null);
  };
  const handleEditButtonClick = () => {
    if (!board.title || !board.content) {
      return toast({
        state: 'error',
        message: '제목과 내용을 입력해주세요.',
      });
    }

    const formData = new FormData();
    const file = uploaderRef.current?.files?.[0];
    if (file) {
      formData.append(FORM_DATA_KEY, file);
    }

    activityGroupBoardPatchMutate({
      activityGroupBoardId: prevData.id,
      groupId: groupId,
      groupBoardId: prevData.parentId,
      body: {
        title: board.title,
        content: board.content,
        dueDateTime: board.dueDateTime,
      },
      files: file ? formData : undefined,
    });
    closeModal();
  };

  return (
    <Modal>
      <Modal.Header>수정하기</Modal.Header>
      <Modal.Body className="space-y-3">
        {prevData.category !== 'FEEDBACK' && (
          <Input
            name="title"
            id="title"
            value={board.title}
            onChange={handleBoardChange}
            placeholder={board.title}
          />
        )}
        <Textarea
          name="content"
          id="content"
          value={board.content}
          onChange={handleBoardChange}
          placeholder={board.content}
        />
        {prevData.category === 'ASSIGNMENT' && (
          <>
            <FileUploader
              uploadedFile={uploadedFile}
              uploaderRef={uploaderRef}
              handleDeleteFileClick={handleDeleteFileClick}
            />
            <Input
              label="종료 일시"
              type="datetime-local"
              id="dueDateTime"
              name="dueDateTime"
              value={board.dueDateTime}
              onChange={handleBoardChange}
            />
          </>
        )}
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

const FileUploader = ({
  uploadedFile,
  uploaderRef,
  handleDeleteFileClick,
}: FileUploaderProps) => {
  return (
    <>
      {uploadedFile && (
        <div className="space-y-2">
          <File key={uploadedFile.fileUrl} href={uploadedFile.fileUrl}>
            {uploadedFile.originalFileName}
          </File>
          <Button className="w-full" onClick={handleDeleteFileClick}>
            첨부파일 변경하기
          </Button>
        </div>
      )}
      <input
        ref={uploaderRef}
        id="uploader"
        type="file"
        className={cn(uploadedFile && 'hidden')}
      />
    </>
  );
};

export default ActivityBoardEditModal;
