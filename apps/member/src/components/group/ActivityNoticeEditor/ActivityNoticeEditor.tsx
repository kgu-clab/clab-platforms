import Section from '@components/common/Section/Section';
import { Input, Button } from '@clab/design-system';
import ActivityNoticeSection from '../ActivityNoticeSection/ActivityNoticeSection';
import type { ActivityBoardType } from '@type/activity';
import { useState } from 'react';
import Textarea from '@components/common/Textarea/Textarea';
import Hr from '@components/common/Hr/Hr';

interface ActivityNoticeEditorProps {
  data: Array<ActivityBoardType>;
}

const ActivityNoticeEditor = ({ data }: ActivityNoticeEditorProps) => {
  const [notice, setNotice] = useState<ActivityBoardType>({
    title: '제목을 입력해주세요.',
    content: '내용을 입력해주세요.',
    id: -1,
    parentId: -1,
    category: 'NOTICE',
    files: [],
    createdAt: new Date().toISOString(),
  });

  const handleNoticeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNotice((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Section>
      <Section.Header title="공지 관리">
        <div className="space-x-2">
          <Button size="sm">추가</Button>
          <Button size="sm" color="red">
            삭제
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
        <ActivityNoticeSection data={[notice, ...data]} />
      </Section.Body>
    </Section>
  );
};

export default ActivityNoticeEditor;
