import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { formattedDate, isDateValid } from '@utils/date';
import { FORM_DATA_KEY } from '@constants/api';
import File from '@components/common/File/File';
import Table from '@components/common/Table/Table';
import { Button } from '@clab/design-system';
import Section from '@components/common/Section/Section';
import type { ActivityBoardType, AssignmentFileType } from '@type/activity';
import Textarea from '@components/common/Textarea/Textarea';
import {
  useActivityGroupBoardModifyMutation,
  useActivityGroupBoardMutation,
  useMyProfile,
} from '@hooks/queries';
import classNames from 'classnames';

interface AssignmentUploadSectionProps {
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
}: AssignmentUploadSectionProps) => {
  const { data: myProfile } = useMyProfile();
  const { activityGroupBoardMutate } = useActivityGroupBoardMutation();
  const { activityGroupBoardModifyMutate } =
    useActivityGroupBoardModifyMutation();

  const uploaderRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<AssignmentFileType | null>(
    myAssignment?.files?.[0] || null,
  );
  const [description, setDescription] = useState<string>(
    myAssignment?.content || '',
  );

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

    if (myAssignment?.content) {
      // 수정
      activityGroupBoardModifyMutate({
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
            className={classNames({
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
              className={classNames(uploadedFile && 'hidden')}
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
      <div className="flex gap-4 mt-2">
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
