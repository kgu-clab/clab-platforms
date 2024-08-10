import { useRef, useState } from 'react';

import { Button, Grid, Input } from '@clab/design-system';

import { Section } from '@components/common/Section';
import Textarea from '@components/common/Textarea/Textarea';

import { FORM_DATA_KEY } from '@constants/api';
import useToast from '@hooks/common/useToast';
import { useActivityGroupBoardMutation, useMyProfile } from '@hooks/queries';

interface Props {
  parentId: number;
  activityGroupId: number;
}

const ActivityAssignmentEditor = ({ parentId, activityGroupId }: Props) => {
  const toast = useToast();
  const [board, setBoard] = useState({
    title: '',
    content: '',
    dueDateTime: '',
    fileUrls: [],
  });

  const { data: myProfile } = useMyProfile();

  const uploaderRef = useRef<HTMLInputElement>(null);
  const { activityGroupBoardMutate } = useActivityGroupBoardMutation();

  const handlePostChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBoard((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddAssignmentClick = () => {
    const formData = new FormData();
    const file = uploaderRef.current?.files?.[0];

    if (!board.title || !board.content || !board.dueDateTime)
      return toast({
        state: 'error',
        message: '제목, 내용, 종료 일시는 필수 입력 요소입니다.',
      });
    if (file) {
      formData.append(FORM_DATA_KEY, file);
    }

    activityGroupBoardMutate({
      parentId: parentId,
      activityGroupId: activityGroupId,
      memberId: myProfile.id,
      body: {
        category: 'ASSIGNMENT',
        ...board,
      },
      files: file ? formData : undefined,
    });
  };

  return (
    <Section>
      <Section.Header title="과제 관리">
        <div className="space-x-2">
          <Button size="sm" onClick={handleAddAssignmentClick}>
            추가
          </Button>
        </div>
      </Section.Header>
      <Section.Body className="space-y-4">
        <div className="space-y-2">
          <Input
            id="title"
            name="title"
            label="제목"
            placeholder="제목을 입력해주세요."
            value={board.title}
            onChange={handlePostChange}
          />
          <Textarea
            id="content"
            name="content"
            label="내용"
            placeholder="내용을 입력해주세요."
            className="w-full"
            maxLength={200}
            value={board.content}
            onChange={handlePostChange}
          />
          <Grid col="2" gap="md" className="items-center">
            <Input
              label="종료 일시"
              type="datetime-local"
              id="dueDateTime"
              name="dueDateTime"
              value={board.dueDateTime}
              onChange={handlePostChange}
            />
            <div className="flex flex-col">
              <label htmlFor="fileUpload" className="mb-1 ml-1 text-xs">
                첨부 파일
              </label>
              <input ref={uploaderRef} id="fileUpload" type="file" />
            </div>
          </Grid>
        </div>
      </Section.Body>
    </Section>
  );
};

export default ActivityAssignmentEditor;
