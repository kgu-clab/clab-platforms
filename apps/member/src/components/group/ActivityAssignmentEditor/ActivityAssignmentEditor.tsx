import { useRef, useState } from 'react';

import { Button, Grid, Input } from '@clab-platforms/design-system';

import { Section } from '@components/common/Section';
import TextCounting from '@components/common/TextCounting/TextCounting';
import Textarea from '@components/common/Textarea/Textarea';

import { FORM_DATA_KEY } from '@constants/api';
import {
  ACTIVITY_BOARD_CATEGORY_STATE,
  ACTIVITY_GROUP_CONTENT_MAX_LENGTH,
} from '@constants/state';
import { useToast } from '@hooks/common/useToast';
import { useActivityGroupBoardMutation, useMyProfile } from '@hooks/queries';
import { isDateValid, toKoreaISOString } from '@utils/date';
import dayjs from 'dayjs';

interface Props {
  parentId: number;
  activityGroupId: number;
}

const defaultBoard = {
  title: '',
  content: '',
  dueDateTime: '',
  fileUrls: [],
};

const ActivityAssignmentEditor = ({ parentId, activityGroupId }: Props) => {
  const { addToast } = useToast();
  const [board, setBoard] = useState(defaultBoard);

  const { data: myProfile } = useMyProfile();

  const uploaderRef = useRef<HTMLInputElement>(null);
  const { activityGroupBoardMutate, activityGroupBoardIsPending } =
    useActivityGroupBoardMutation();

  const handlePostChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBoard((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddAssignmentClick = () => {
    const formData = new FormData();
    const files = uploaderRef.current?.files;

    if (!board.title || !board.content || !board.dueDateTime) {
      return addToast({
        state: 'error',
        message: '제목, 내용, 종료 일시는 필수 입력 요소입니다.',
      });
    } else if (board.content.length > ACTIVITY_GROUP_CONTENT_MAX_LENGTH) {
      return addToast({
        state: 'error',
        message: `내용은 ${ACTIVITY_GROUP_CONTENT_MAX_LENGTH}자 이내로 작성해주세요.`,
      });
    }

    if (isDateValid(board.dueDateTime, toKoreaISOString(String(dayjs())))) {
      return addToast({
        state: 'error',
        message: '종료 일시는 현재 일시 이후로 선택해주세요.',
      });
    }

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append(FORM_DATA_KEY, file);
      });
    }

    activityGroupBoardMutate(
      {
        parentId: parentId,
        activityGroupId: activityGroupId,
        memberId: myProfile.id,
        body: {
          category: ACTIVITY_BOARD_CATEGORY_STATE.ASSIGNMENT,
          ...board,
        },
        files: files?.length ? formData : undefined,
      },
      { onSuccess: () => setBoard(defaultBoard) },
    );
  };

  return (
    <Section>
      <Section.Header title="과제 관리" />
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
            value={board.content}
            onChange={handlePostChange}
          />
          <TextCounting
            maxLength={ACTIVITY_GROUP_CONTENT_MAX_LENGTH}
            text={board.content}
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
              <input ref={uploaderRef} id="fileUpload" type="file" multiple />
            </div>
          </Grid>
        </div>
        <Button
          className="w-full"
          onClick={handleAddAssignmentClick}
          disabled={activityGroupBoardIsPending}
        >
          추가
        </Button>
      </Section.Body>
    </Section>
  );
};

export default ActivityAssignmentEditor;
