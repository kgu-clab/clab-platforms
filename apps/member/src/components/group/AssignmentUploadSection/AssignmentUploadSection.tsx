import { useRef, useState } from 'react';

import { formattedDate } from '@utils/date';
import useToast from '@hooks/common/useToast';
import { FORM_DATA_KEY } from '@constants/api';
import File from '@components/common/File/File';
import Table from '@components/common/Table/Table';
import { Button, Input } from '@clab/design-system';
import Section from '@components/common/Section/Section';
import type { ActivityBoardType } from '@type/activity';
import Textarea from '@components/common/Textarea/Textarea';
import { useActivityGroupBoardMutation, useMyProfile } from '@hooks/queries';

interface AssignmentUploadSectionProps {
  activityGroupId: string;
  assignmentId: string;
  dueDateTime?: string;
  mySubmit?: ActivityBoardType;
}

const AssignmentUploadSection = ({
  activityGroupId,
  assignmentId,
  dueDateTime,
  mySubmit,
}: AssignmentUploadSectionProps) => {
  const toast = useToast();
  const { data: myProfile } = useMyProfile();
  const { activityGroupBoardMutate } = useActivityGroupBoardMutation();

  const uploaderRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState<string>(
    mySubmit?.content || '',
  );

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const onClickSubmit = () => {
    if (uploaderRef.current?.files?.length) {
      const file = uploaderRef.current?.files[0];

      if (file) {
        const formData = new FormData();
        formData.append(FORM_DATA_KEY, file);

        activityGroupBoardMutate({
          parentId: assignmentId,
          activityGroupId: activityGroupId,
          memberId: myProfile.id,
          body: {
            category: 'SUBMIT',
            content: description,
          },
          files: formData,
        });
      }
    } else {
      toast({
        state: 'error',
        message: '파일을 첨부해주세요.',
      });
    }
  };

  const uploadedFile = mySubmit?.files[0];

  return (
    <Section>
      <Section.Header title="제출 상황" />
      <Table>
        <Table.Row>
          <td className="p-2">과제 제출 여부</td>
          <td className="p-2">
            {uploadedFile === undefined ? '미제출' : '제출 완료'}
          </td>
        </Table.Row>
        <Table.Row>
          <Table.Cell>종료 일시</Table.Cell>
          <Table.Cell>{formattedDate(dueDateTime)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>제출 일시</Table.Cell>
          <Table.Cell>
            {uploadedFile
              ? formattedDate(uploadedFile.createdAt)
              : '아직 제출하지 않았습니다.'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>첨부 파일</Table.Cell>
          <Table.Cell>
            {uploadedFile ? (
              <File href={uploadedFile.fileUrl}>
                {uploadedFile.originalFileName}
              </File>
            ) : (
              <Input ref={uploaderRef} id="uploader" type="file" />
            )}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>제출물 설명</Table.Cell>
          <Table.Cell>
            <Textarea
              className="w-full"
              placeholder={mySubmit?.content || '제출물 설명을 입력해주세요.'}
              value={description}
              onChange={handleDescriptionChange}
            />
          </Table.Cell>
        </Table.Row>
      </Table>
      <Button className="mt-2" onClick={onClickSubmit}>
        {uploadedFile ? '수정하기' : '제출하기'}
      </Button>
    </Section>
  );
};

export default AssignmentUploadSection;
