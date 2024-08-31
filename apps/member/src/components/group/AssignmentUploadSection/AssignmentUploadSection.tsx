import { useEffect, useRef, useState } from 'react';

import { Button, Table } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import File from '@components/common/File/File';
import Section from '@components/common/Section/Section';
import Textarea from '@components/common/Textarea/Textarea';

import { FORM_DATA_KEY } from '@constants/api';
import useToast from '@hooks/common/useToast';
import {
  useActivityGroupBoardMutation,
  useActivityGroupBoardPatchMutation,
  useMyProfile,
} from '@hooks/queries';
import { formattedDate, isDateValid, toKoreaISOString } from '@utils/date';

import type { ActivityBoardType } from '@type/activity';
import type { ResponseFile } from '@type/api';

interface Props {
  activityGroupId: number;
  assignmentId: number;
  dueDateTime?: string;
  myAssignment?: ActivityBoardType;
}

const AssignmentUploadSection = ({
  activityGroupId,
  assignmentId,
  dueDateTime,
  myAssignment,
}: Props) => {
  const toast = useToast();
  const { data: myProfile } = useMyProfile();
  const { activityGroupBoardMutate, activityGroupBoardIsPending } =
    useActivityGroupBoardMutation();
  const { activityGroupBoardPatchMutate, activityGroupBoardPatchIsPending } =
    useActivityGroupBoardPatchMutation();
  const [editMode, setEditMode] = useState(false);

  const uploaderRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<ResponseFile | null>(
    myAssignment?.files?.[0] || null,
  );
  const [description, setDescription] = useState(myAssignment?.content ?? '');

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleDeleteFileClick = () => {
    setEditMode(true);
    setUploadedFile(null);
  };

  const handleSubmitButtonClick = () => {
    const formData = new FormData();
    const file = uploaderRef.current?.files?.[0];

    if (!description || !file) {
      return toast({
        state: 'error',
        message: '첨부파일과 설명을 입력해주세요.',
      });
    }
    if (file) {
      formData.append(FORM_DATA_KEY, file);
    }

    if (myAssignment?.content || myAssignment?.files?.length) {
      // 기존에 제출한 내용이나 파일이 있는 경우 수정으로 처리합니다.
      activityGroupBoardPatchMutate({
        activityGroupBoardId: myAssignment.id,
        groupId: activityGroupId,
        groupBoardId: assignmentId,
        body: {
          content: description,
        },
        files: file ? formData : undefined,
      });
    } else {
      // 신규 제출
      activityGroupBoardMutate({
        parentId: assignmentId,
        activityGroupId: activityGroupId,
        memberId: myProfile.id,
        body: {
          category: 'SUBMIT',
          content: description,
        },
        files: file ? formData : undefined,
      });
    }

    setEditMode(false);
    setUploadedFile(null);
  };

  useEffect(() => {
    if (!editMode) {
      setDescription(myAssignment?.content || '');
      setUploadedFile(myAssignment?.files?.[0] || null);
    }
  }, [editMode, myAssignment]);

  return (
    <Section>
      <Section.Header title="제출 상황" />
      <Table>
        <Table.Row>
          <td className="w-1/3 p-2">과제 제출 여부</td>
          <td className="p-2">{uploadedFile ? '제출 완료' : '미제출'}</td>
        </Table.Row>
        <Table.Row>
          <Table.Cell>종료 일시</Table.Cell>
          <Table.Cell>{formattedDate(dueDateTime)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>제출 일시</Table.Cell>
          <Table.Cell
            className={cn({
              'text-red-500': !isDateValid(
                dueDateTime,
                uploadedFile?.createdAt,
              ),
            })}
          >
            {uploadedFile
              ? formattedDate(toKoreaISOString(uploadedFile.createdAt))
              : '아직 제출하지 않았습니다.'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>첨부 파일</Table.Cell>
          <Table.Cell>
            {uploadedFile && (
              <File href={uploadedFile.fileUrl}>
                {uploadedFile.originalFileName}
              </File>
            )}
            <input
              ref={uploaderRef}
              id="uploader"
              type="file"
              className={cn(uploadedFile && 'hidden')}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>제출물 설명</Table.Cell>
          <Table.Cell>
            <Textarea
              className="w-full"
              placeholder={description || '제출물 설명을 입력해주세요.'}
              value={description}
              onChange={handleDescriptionChange}
              disabled={!editMode && Boolean(myAssignment)} // 제출물이 없는 상태엔 입력 가능, 제출물이 있지만 수정하기 버튼이 클릭되지 않으면 수정 불가
            />
          </Table.Cell>
        </Table.Row>
      </Table>
      <div className="mt-2 flex gap-4">
        {uploadedFile && !editMode && (
          <Button
            className="w-full"
            color="orange"
            onClick={handleDeleteFileClick}
          >
            수정하기
          </Button>
        )}
        <Button
          className="w-full"
          onClick={handleSubmitButtonClick}
          disabled={
            activityGroupBoardIsPending || activityGroupBoardPatchIsPending
          }
        >
          제출하기
        </Button>
      </div>
    </Section>
  );
};

export default AssignmentUploadSection;
