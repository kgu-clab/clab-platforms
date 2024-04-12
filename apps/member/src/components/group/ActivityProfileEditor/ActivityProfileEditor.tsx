import { ChangeEvent, useState } from 'react';

import { Button, Input } from '@clab/design-system';

import Section from '@components/common/Section/Section';
import Textarea from '@components/common/Textarea/Textarea';

import type { ActivityGroupBoardParserType } from '@type/activity';

import ActivityDetailSection from '../ActivityDetailSection/ActivityDetailSection';

interface ActivityProfileEditorProps {
  data: ActivityGroupBoardParserType;
}

const ActivityProfileEditor = ({ data }: ActivityProfileEditorProps) => {
  const [activityDetail, setActivityDetail] =
    useState<ActivityGroupBoardParserType>(data);

  const handleActivityDetail = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setActivityDetail({ ...activityDetail, [name]: value });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Section>
        <Section.Header title="프로필 관리">
          <Button size="sm">저장</Button>
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
          <Input id="imageUrl" label="사진" type="file" />
        </Section.Body>
      </Section>
      <Section className="hidden sm:block">
        <ActivityDetailSection data={activityDetail} />
      </Section>
    </div>
  );
};

export default ActivityProfileEditor;
