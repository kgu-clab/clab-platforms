import { useRef, useState } from 'react';

import { Button, Input } from '@clab-platforms/design-system';

import Hr from '@components/common/Hr/Hr';
import Section from '@components/common/Section/Section';
import Textarea from '@components/common/Textarea/Textarea';

import { FORM_DATA_KEY } from '@constants/api';
import useToast from '@hooks/common/useToast';
import { useActivityGroupBoardMutation } from '@hooks/queries';

import type { ActivityBoardType } from '@type/activity';

import ActivityConfigTableSection from '../ActivityConfigTableSection/ActivityConfigTableSection';
import ActivityNoticeSection from '../ActivityNoticeSection/ActivityNoticeSection';

interface ActivityNoticeEditorProps {
  groupId: number;
  data: ActivityBoardType[];
}

const defaultNotice: ActivityBoardType = {
  title: '',
  content: '',
  id: -1,
  parentId: -1,
  category: 'NOTICE',
  files: [],
  createdAt: new Date().toISOString(),
};

const ActivityNoticeEditor = ({ groupId, data }: ActivityNoticeEditorProps) => {
  const toast = useToast();
  const [notice, setNotice] = useState<ActivityBoardType>(defaultNotice);
  const uploaderRef = useRef<HTMLInputElement>(null);
  const { activityGroupBoardMutate, activityGroupBoardIsPending } =
    useActivityGroupBoardMutation();

  const handleNoticeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNotice((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNoticeButtonClick = () => {
    const formData = new FormData();
    const files = uploaderRef.current?.files;

    if (!notice.title || !notice.content)
      return toast({
        state: 'error',
        message: '제목, 내용은 필수 입력 요소입니다.',
      });
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append(FORM_DATA_KEY, file);
      });
    }

    activityGroupBoardMutate(
      {
        activityGroupId: groupId,
        body: notice,
        files: files?.length ? formData : undefined,
      },
      { onSuccess: () => setNotice(defaultNotice) },
    );
  };

  return (
    <>
      <Section>
        <Section.Header title="공지 관리" />
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
            <input ref={uploaderRef} id="uploader" type="file" multiple />
          </div>
          <Hr>미리보기</Hr>
          <ActivityNoticeSection data={[notice, ...data]} />
          <Button
            className="w-full"
            onClick={handleAddNoticeButtonClick}
            disabled={activityGroupBoardIsPending}
          >
            추가
          </Button>
        </Section.Body>
      </Section>
      <ActivityConfigTableSection tableList={data} groupId={groupId} />
    </>
  );
};

export default ActivityNoticeEditor;
