import Section from '@components/common/Section/Section';
import { Input, Button } from '@clab/design-system';
import Textarea from '@components/common/Textarea/Textarea';
import type { ActivityBoardWithAssignmentType } from '@type/activity';
import { useState } from 'react';
import WeeklyActivityCard from '../WeeklyActivityCard/WeeklyActivityCard';
import Hr from '@components/common/Hr/Hr';

interface ActivityPostEditorProps {
  groupId: number;
  data: ActivityBoardWithAssignmentType[];
}

const ActivityPostEditor = ({ groupId, data }: ActivityPostEditorProps) => {
  const [post, setPost] = useState({
    title: '제목을 입력해주세요.',
    content: '내용을 입력해주세요.',
  });

  const handlePostChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Section>
        <Section.Header title="활동 관리">
          <Button size="sm">추가</Button>
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
              index={0}
              groupId={groupId}
              title={post.title}
              content={post.content}
              isParticipant
            />
          </Section>
        </Section.Body>
      </Section>
      {data.map((activity, index) => (
        <Section key={activity.id} className="relative">
          <div className="absolute space-x-2 top-4 right-4">
            <Button size="sm" color="orange">
              과제 관리
            </Button>
            <Button size="sm">수정</Button>
            <Button size="sm" color="red">
              삭제
            </Button>
          </div>
          <WeeklyActivityCard
            key={index}
            index={index}
            groupId={groupId}
            isParticipant
            {...activity}
          />
        </Section>
      ))}
    </>
  );
};

export default ActivityPostEditor;
