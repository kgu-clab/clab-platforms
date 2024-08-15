import { useState } from 'react';

import { Button, Input } from '@clab-platforms/design-system';

import Hr from '@components/common/Hr/Hr';
import Section from '@components/common/Section/Section';
import Textarea from '@components/common/Textarea/Textarea';

import useModal from '@hooks/common/useModal';
import useToast from '@hooks/common/useToast';
import { useActivityGroupBoardByCategory } from '@hooks/queries/activity/useActivityGroupBoardByCategory';
import {
  useActivityGroupBoardDeleteMutation,
  useActivityGroupBoardMutation,
} from '@hooks/queries/activity/useActivityGroupBoardMutation';

import type {
  ActivityBoardType,
  ActivityBoardWithAssignmentType,
  SubmitBoardType,
} from '@type/activity';

import ActivityAssignmentEditor from '../ActivityAssignmentEditor/ActivityAssignmentEditor';
import ActivityBoardEditModal from '../ActivityBoardEditModal/ActivityBoardEditModal';
import ActivityConfigTableSection from '../ActivityConfigTableSection/ActivityConfigTableSection.tsx';
import WeeklyActivityCard from '../WeeklyActivityCard/WeeklyActivityCard';

interface ActivityPostEditorProps {
  groupId: number;
  data: ActivityBoardWithAssignmentType[];
}

const ActivityPostEditor = ({ groupId, data }: ActivityPostEditorProps) => {
  const toast = useToast();
  const { openModal } = useModal();
  const [post, setPost] = useState({
    title: '',
    content: '',
  });
  const [editAssignment, setEditAssignment] = useState<boolean[]>(
    Array.from({ length: data.length }, () => false),
  );

  const { activityGroupBoardMutate } = useActivityGroupBoardMutation();
  const { activityGroupBoardDeleteMutate } =
    useActivityGroupBoardDeleteMutation();
  const { data: assignmentData } = useActivityGroupBoardByCategory({
    activityGroupId: groupId,
    category: 'ASSIGNMENT',
  });

  const handlePostChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddWeeklyClick = () => {
    if (!post.title || !post.content)
      return toast({
        state: 'error',
        message: '제목, 내용은 필수 입력 요소입니다.',
      });

    const activityBoardItem: SubmitBoardType = {
      category: 'WEEKLY_ACTIVITY',
      ...post,
    };
    activityGroupBoardMutate({
      activityGroupId: groupId,
      body: activityBoardItem,
    });
  };
  const handleDeleteWeeklyClick = (activityGroupBoardId: number) => {
    activityGroupBoardDeleteMutate(activityGroupBoardId);
  };
  const handleEditWeeklyClick = (prevData: ActivityBoardType) =>
    openModal({
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
        <Section.Header title="주차별 활동 관리">
          <Button size="sm" onClick={handleAddWeeklyClick}>
            추가
          </Button>
        </Section.Header>
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
              maxLength={200}
              value={post.content}
              onChange={handlePostChange}
            />
          </div>
          <Hr>미리보기</Hr>
          <Section>
            <WeeklyActivityCard
              index={data.length}
              groupId={groupId}
              title={post.title}
              content={post.content}
              isParticipant
            />
          </Section>
        </Section.Body>
      </Section>
      {data.map((weeklyData, index) => (
        <div key={weeklyData.id}>
          <Section className="relative">
            <div className="absolute right-4 top-4 space-x-2">
              <Button
                size="sm"
                color="orange"
                onClick={() => handleAssignmentEditClick(index)}
              >
                과제 관리
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
                tableList={assignmentData.items.filter(
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
