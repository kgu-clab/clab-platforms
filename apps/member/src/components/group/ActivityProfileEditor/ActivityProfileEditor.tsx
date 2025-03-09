import { ChangeEvent, useState } from 'react';

import { Button, Input } from '@clab-platforms/design-system';

import Section from '@components/common/Section/Section';
import TextCounting from '@components/common/TextCounting/TextCounting';
import Textarea from '@components/common/Textarea/Textarea';

import { ACTIVITY_GROUP_CONTENT_MAX_LENGTH } from '@constants/state';
import { useToast } from '@hooks/common/useToast';
import { useActivityGroupAdminMutation } from '@hooks/queries';

import type {
  ActivityGroupBoardParserType,
  ActivityGroupCreateItem,
} from '@type/activity';

import ActivityDetailSection from '../ActivityDetailSection/ActivityDetailSection';

interface ActivityProfileEditorProps {
  data: ActivityGroupBoardParserType;
}

const ActivityProfileEditor = ({ data }: ActivityProfileEditorProps) => {
  const { addToast } = useToast();
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
    if (activityDetail.content.length > ACTIVITY_GROUP_CONTENT_MAX_LENGTH) {
      return addToast({
        state: 'error',
        message: `내용은 ${ACTIVITY_GROUP_CONTENT_MAX_LENGTH}자 이내로 작성해주세요.`,
      });
    }

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
          <div>
            <Textarea
              id="content"
              name="content"
              label="내용"
              placeholder="내용을 입력해주세요."
              className="h-32 w-full"
              value={activityDetail.content}
              onChange={handleActivityDetail}
            />
            <TextCounting
              maxLength={ACTIVITY_GROUP_CONTENT_MAX_LENGTH}
              text={activityDetail.content}
            />
          </div>
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
