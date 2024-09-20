import { useRef, useState } from 'react';

import { Button, Input } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import File from '@components/common/File/File';
import Modal from '@components/common/Modal/Modal';
import Textarea from '@components/common/Textarea/Textarea';

import { FORM_DATA_KEY } from '@constants/api';
import { ACTIVITY_BOARD_CATEGORY_STATE } from '@constants/state';
import { useModal } from '@hooks/common/useModal';
import useToast from '@hooks/common/useToast';
import { useActivityGroupBoardPatchMutation } from '@hooks/queries';

import type { ActivityBoardType } from '@type/activity';
import type { ResponseFile } from '@type/api';

interface Props {
  prevData: ActivityBoardType;
  groupId: number;
}
interface FileUploaderProps {
  uploadedFile: Array<ResponseFile> | null;
  uploaderRef: React.RefObject<HTMLInputElement>;
  handleDeleteFileClick: () => void;
}

export const ActivityBoardEditModal = ({ prevData, groupId }: Props) => {
  const { close } = useModal();
  const toast = useToast();
  const [board, setBoard] = useState<ActivityBoardType>(prevData);

  const uploaderRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<Array<ResponseFile> | null>(
    prevData?.files || null,
  );
  const { activityGroupBoardPatchMutate, activityGroupBoardPatchIsPending } =
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
    const formData = new FormData();
    const files = uploaderRef.current?.files;

    if (!board.title || !board.content) {
      return toast({
        state: 'error',
        message: '제목과 내용을 입력해주세요.',
      });
    }
    if (files?.length) {
      Array.from(files).forEach((file) => {
        formData.append(FORM_DATA_KEY, file);
      });
    }

    activityGroupBoardPatchMutate({
      activityGroupBoardId: prevData.id,
      groupId: groupId,
      groupBoardId: prevData.parentId,
      body: {
        title: board.title,
        content: board.content,
        dueDateTime: board.dueDateTime,
        category: board.category,
      },
      files: files?.length ? formData : undefined,
    });
    close();
  };

  return (
    <Modal>
      <Modal.Header>수정하기</Modal.Header>
      <Modal.Body className="space-y-3">
        {prevData.category !== ACTIVITY_BOARD_CATEGORY_STATE.FEEDBACK && (
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
        <FileUploader
          uploadedFile={uploadedFile}
          uploaderRef={uploaderRef}
          handleDeleteFileClick={handleDeleteFileClick}
        />
        {prevData.category === ACTIVITY_BOARD_CATEGORY_STATE.ASSIGNMENT && (
          <Input
            label="종료 일시"
            type="datetime-local"
            id="dueDateTime"
            name="dueDateTime"
            value={board.dueDateTime}
            onChange={handleBoardChange}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button
          color="orange"
          onClick={handleEditButtonClick}
          disabled={activityGroupBoardPatchIsPending}
        >
          변경
        </Modal.Button>
        <Modal.Button color="gray" onClick={close}>
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
      {uploadedFile?.length ? (
        <>
          <div className="flex flex-col gap-1">
            {uploadedFile?.map((file) => (
              <File
                key={file.fileUrl}
                href={file.fileUrl}
                name={file.originalFileName}
              />
            ))}
          </div>
          <Button className="w-full" onClick={handleDeleteFileClick}>
            첨부파일 변경하기
          </Button>
        </>
      ) : (
        <input
          ref={uploaderRef}
          id="uploader"
          type="file"
          multiple
          className={cn(uploadedFile?.length && 'hidden')}
        />
      )}
    </>
  );
};
