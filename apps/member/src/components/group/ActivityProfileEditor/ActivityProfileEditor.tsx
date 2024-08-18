import { ChangeEvent, useState } from 'react';

import { Button, Input } from '@clab-platforms/design-system';

import Section from '@components/common/Section/Section';
import Textarea from '@components/common/Textarea/Textarea';

import { useActivityGroupAdminMutation } from '@hooks/queries/activity/useActivityGroupAdminMutation';

import type {
  ActivityGroupBoardParserType,
  ActivityGroupCreateItem,
} from '@type/activity';

import ActivityDetailSection from '../ActivityDetailSection/ActivityDetailSection';

interface ActivityProfileEditorProps {
  data: ActivityGroupBoardParserType;
}

const ActivityProfileEditor = ({ data }: ActivityProfileEditorProps) => {
  const [activityDetail, setActivityDetail] =
    useState<ActivityGroupBoardParserType>(data);
  const { activityGroupAdminMutate } = useActivityGroupAdminMutation();

  const handleActivityDetail = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setActivityDetail({ ...activityDetail, [name]: value });
  };
  const handleSaveButtonClick = () => {
    const activityGroupItem: ActivityGroupCreateItem = {
      category: activityDetail.category,
      subject: activityDetail.subject,
      name: activityDetail.name,
      content: activityDetail.content,
      githubUrl: activityDetail.githubUrl,
      techStack: activityDetail.techStack,
    };
    activityGroupAdminMutate({
      activityGroupId: activityDetail.id,
      body: activityGroupItem,
    });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Section>
        <Section.Header title="프로필 관리">
          <Button size="sm" onClick={handleSaveButtonClick}>
            저장
          </Button>
        </Section.Header>
        <Section.Body className="space-y-2">
          <Input
            id="name"
            name="name"
            label="활동명"
            value={activityDetail.name}
            onChange={handleActivityDetail}
          />
          <Textarea
            id="content"
            name="content"
            label="내용"
            placeholder="내용을 입력해주세요."
            className="w-full"
            maxLength={200}
            value={activityDetail.content}
            onChange={handleActivityDetail}
          />
          <Input
            id="subject"
            name="subject"
            label="대상"
            value={activityDetail.subject}
            onChange={handleActivityDetail}
          />
          <Input
            id="githubUrl"
            name="githubUrl"
            label="Github"
            value={activityDetail.githubUrl}
            onChange={handleActivityDetail}
          />
          <Input
            id="techStack"
            name="techStack"
            label="기술스택"
            value={activityDetail.techStack}
            onChange={handleActivityDetail}
          />
        </Section.Body>
      </Section>
      <Section className="hidden sm:block">
        <ActivityDetailSection data={activityDetail} />
      </Section>
    </div>
  );
};

export default ActivityProfileEditor;
