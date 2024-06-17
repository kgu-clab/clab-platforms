import { useEffect, useRef, useState } from 'react';

import { Button, Table } from '@clab/design-system';

import File from '@components/common/File/File';
import Section from '@components/common/Section/Section';
import Textarea from '@components/common/Textarea/Textarea';

import { FORM_DATA_KEY } from '@constants/api';
import {
  useActivityGroupBoardMutation,
  useActivityGroupBoardPatchMutation,
  useMyProfile,
} from '@hooks/queries';
import { formattedDate, isDateValid } from '@utils/date';
import { cn } from '@utils/string';

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
  const { data: myProfile } = useMyProfile();
  const { activityGroupBoardMutate } = useActivityGroupBoardMutation();
  const { activityGroupBoardPatchMutate } =
    useActivityGroupBoardPatchMutation();

  const uploaderRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<ResponseFile | null>(
    myAssignment?.files?.[0] || null,
  );
  const [description, setDescription] = useState(myAssignment?.content || '');

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const onClickDeleteFile = () => {
    setUploadedFile(null);
  };

  const onClickSubmit = () => {
    const formData = new FormData();
    const file = uploaderRef.current?.files?.[0];

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
  };

  useEffect(() => {
    if (myAssignment) {
      setUploadedFile(myAssignment.files?.[0] || null);
      setDescription(myAssignment.content || '');
    }
  }, [myAssignment]);

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
              ? formattedDate(uploadedFile.createdAt)
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
            />
          </Table.Cell>
        </Table.Row>
      </Table>
      <div className="mt-2 flex gap-4">
        {uploadedFile && (
          <Button className="w-full" color="orange" onClick={onClickDeleteFile}>
            첨부파일 변경하기
          </Button>
        )}
        <Button
          className="w-full"
          onClick={onClickSubmit}
          disabled={description.length === 0}
        >
          제출하기
        </Button>
      </div>
    </Section>
  );
};

export default AssignmentUploadSection;
