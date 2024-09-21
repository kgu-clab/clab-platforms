import { useEffect, useRef, useState } from 'react';

import { Button, Input } from '@clab-platforms/design-system';

import Hr from '@components/common/Hr/Hr';
import Section from '@components/common/Section/Section';
import TextCounting from '@components/common/TextCounting/TextCounting';
import Textarea from '@components/common/Textarea/Textarea';
import { ActivityBoardEditModal } from '@components/modal';

import { FORM_DATA_KEY } from '@constants/api.ts';
import {
  ACTIVITY_BOARD_CATEGORY_STATE,
  ACTIVITY_GROUP_CONTENT_MAX_LENGTH,
} from '@constants/state.ts';
import { useModal } from '@hooks/common/useModal.ts';
import useToast from '@hooks/common/useToast';
import {
  useActivityGroupBoardDeleteMutation,
  useActivityGroupBoardMutation,
  useMyProfile,
} from '@hooks/queries/index.ts';

import type { ActivityBoardType, SubmitBoardType } from '@type/activity';

import ActivityAssignmentEditor from '../ActivityAssignmentEditor/ActivityAssignmentEditor';
import ActivityConfigTableSection from '../ActivityConfigTableSection/ActivityConfigTableSection.tsx';
import WeeklyActivityCard from '../WeeklyActivityCard/WeeklyActivityCard';

interface ActivityPostEditorProps {
  groupId: number;
  activities: ActivityBoardType[];
  assignments: ActivityBoardType[];
}

const defaultPost = {
  title: '',
  content: '',
};

const ActivityPostEditor = ({
  groupId,
  activities,
  assignments,
}: ActivityPostEditorProps) => {
  const toast = useToast();
  const { open } = useModal();
  const [post, setPost] = useState(defaultPost);
  const [editAssignment, setEditAssignment] = useState<boolean[]>(
    Array.from({ length: activities.length }, () => false),
  );
  const uploaderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditAssignment(Array.from({ length: activities.length }, () => false));
  }, [activities]);

  const { data: myProfile } = useMyProfile();

  const { activityGroupBoardMutate, activityGroupBoardIsPending } =
    useActivityGroupBoardMutation();
  const { activityGroupBoardDeleteMutate } =
    useActivityGroupBoardDeleteMutation();

  const handlePostChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddWeeklyClick = () => {
    const formData = new FormData();
    const files = uploaderRef.current?.files;

    if (!post.title || !post.content) {
      return toast({
        state: 'error',
        message: '제목, 내용은 필수 입력 요소입니다.',
      });
    } else if (post.content.length > ACTIVITY_GROUP_CONTENT_MAX_LENGTH) {
      return toast({
        state: 'error',
        message: `내용은 ${ACTIVITY_GROUP_CONTENT_MAX_LENGTH}자 이내로 작성해주세요.`,
      });
    }

    if (files?.length) {
      Array.from(files).forEach((file) => {
        formData.append(FORM_DATA_KEY, file);
      });
    }

    const activityBoardItem: SubmitBoardType = {
      category: ACTIVITY_BOARD_CATEGORY_STATE.WEEKLY_ACTIVITY,
      ...post,
    };
    activityGroupBoardMutate(
      {
        activityGroupId: groupId,
        memberId: myProfile.id,
        body: activityBoardItem,
        files: files?.length ? formData : undefined,
      },
      { onSuccess: () => setPost(defaultPost) },
    );
  };
  const handleDeleteWeeklyClick = (activityGroupBoardId: number) => {
    activityGroupBoardDeleteMutate(activityGroupBoardId);
  };
  const handleEditWeeklyClick = (prevData: ActivityBoardType) =>
    open({
      title: '수정하기',
      custom: <ActivityBoardEditModal groupId={groupId} prevData={prevData} />,
    });
  const handleAssignmentEditClick = (weekly: number) => {
    setEditAssignment((prev) =>
      prev.map((value, index) => (weekly === index ? !value : value)),
    );
  };

  return (
    <>
      <Section>
        <Section.Header title="주차별 활동 관리" />
        <Section.Body className="space-y-4">
          <div className="space-y-2">
            <Input
              id="title"
              name="title"
              label="제목"
              placeholder="제목을 입력해주세요."
              value={post.title}
              onChange={handlePostChange}
            />
            <Textarea
              id="content"
              name="content"
              label="내용"
              placeholder="내용을 입력해주세요."
              className="w-full"
              value={post.content}
              onChange={handlePostChange}
            />
            <TextCounting
              maxLength={ACTIVITY_GROUP_CONTENT_MAX_LENGTH}
              text={post.content}
            />
            <div className="flex flex-col">
              <label htmlFor="fileUpload" className="mb-1 ml-1 text-xs">
                첨부 파일
              </label>
              <input ref={uploaderRef} id="fileUpload" type="file" multiple />
            </div>
          </div>
          <Hr>미리보기</Hr>
          <Section>
            <WeeklyActivityCard
              index={activities.length}
              groupId={groupId}
              title={post.title}
              content={post.content}
              isParticipant
            />
          </Section>
          <Button
            className="w-full"
            onClick={handleAddWeeklyClick}
            disabled={activityGroupBoardIsPending}
          >
            추가
          </Button>
        </Section.Body>
      </Section>
      {activities.map((weeklyData, index) => (
        <div key={weeklyData.id}>
          <Section className="relative">
            <div className="absolute right-4 top-4 space-x-2">
              <Button
                size="sm"
                color="orange"
                onClick={() => handleAssignmentEditClick(index)}
              >
                {editAssignment[index] ? '과제 관리 닫기' : '과제 관리 하기'}
              </Button>
              <Button
                size="sm"
                onClick={() => handleEditWeeklyClick(weeklyData)}
              >
                수정
              </Button>
              <Button
                size="sm"
                color="red"
                onClick={() => handleDeleteWeeklyClick(weeklyData.id)}
              >
                삭제
              </Button>
            </div>
            <WeeklyActivityCard
              key={index}
              index={index}
              groupId={groupId}
              isParticipant
              {...weeklyData}
            />
          </Section>
          {editAssignment[index] && (
            <>
              <ActivityAssignmentEditor
                parentId={weeklyData.id}
                activityGroupId={groupId}
              />
              <ActivityConfigTableSection
                tableList={assignments.filter(
                  (item) => item.parentId === weeklyData.id,
                )}
                groupId={groupId}
              />
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default ActivityPostEditor;
