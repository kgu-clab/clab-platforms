import { useState } from 'react';

import { Button, Input } from '@clab-platforms/design-system';

import Hr from '@components/common/Hr/Hr';
import Section from '@components/common/Section/Section';
import Textarea from '@components/common/Textarea/Textarea';

import { useActivityGroupBoardByCategory } from '@hooks/queries/activity/useActivityGroupBoardByCategory';
import { useActivityGroupBoardMutation } from '@hooks/queries/activity/useActivityGroupBoardMutation';

import type { ActivityBoardType } from '@type/activity';

import ActivityConfigTableSection from '../ActivityConfigTableSection/ActivityConfigTableSection';
import ActivityNoticeSection from '../ActivityNoticeSection/ActivityNoticeSection';

interface Props {
  groupId: number;
}

const ActivityNoticeEditor = ({ groupId }: Props) => {
  const [notice, setNotice] = useState<ActivityBoardType>({
    title: '제목을 입력해주세요.',
    content: '내용을 입력해주세요.',
    id: -1,
    parentId: -1,
    category: 'NOTICE',
    files: [],
    createdAt: new Date().toISOString(),
  });
  const { data: noticeData } = useActivityGroupBoardByCategory({
    activityGroupId: groupId,
    category: 'NOTICE',
  });
  const { activityGroupBoardMutate } = useActivityGroupBoardMutation();

  const handleNoticeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNotice((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddNoticeButtonClick = () => {
    activityGroupBoardMutate({
      activityGroupId: groupId,
      body: notice,
    });
  };

  return (
    <>
      <Section>
        <Section.Header title="공지 관리">
          <div className="space-x-2">
            <Button size="sm" onClick={handleAddNoticeButtonClick}>
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
              value={notice.title}
              onChange={handleNoticeChange}
            />
            <Textarea
              id="content"
              name="content"
              placeholder="내용을 입력해주세요."
              className="w-full"
              maxLength={200}
              value={notice.content}
              onChange={handleNoticeChange}
            />
          </div>
          <Hr>미리보기</Hr>
          <ActivityNoticeSection data={[notice, ...noticeData.items]} />
        </Section.Body>
      </Section>
      <ActivityConfigTableSection
        tableList={noticeData.items}
        groupId={groupId}
      />
    </>
  );
};

export default ActivityNoticeEditor;
