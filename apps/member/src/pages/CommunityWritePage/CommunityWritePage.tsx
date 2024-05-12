import { ChangeEvent, useState } from 'react';

import { Button, Checkbox, Input } from '@clab/design-system';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';

import { ERROR_MESSAGE } from '@constants/message';
import { PATH, PATH_NAME } from '@constants/path';
import {
  SELECT_DEFAULT_OPTION,
  SELECT_OPTIONS_COMMUNITY_TYPE,
} from '@constants/select';
import useToast from '@hooks/common/useToast';
import { useBoardWriteMutation } from '@hooks/queries';

import type { CommunityWriteItem } from '@type/community';

const CommunityWritePage = () => {
  const toast = useToast();
  const { boardWriteMutate } = useBoardWriteMutation();

  const [postInfo, setPostInfo] = useState<CommunityWriteItem>({
    category: SELECT_DEFAULT_OPTION,
    title: '',
    content: '',
    wantAnonymous: false,
  });

  const { category, title, content, wantAnonymous } = postInfo;

  const handleContentChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) =>
    setPostInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPostInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.checked };
    });

  const handleSubmitClick = () => {
    if (!title || !content || category === SELECT_DEFAULT_OPTION) {
      return toast({
        state: 'error',
        message: ERROR_MESSAGE.NO_DATA,
      });
    }

    boardWriteMutate(postInfo);
  };

  return (
    <Content>
      <Header title={[PATH_NAME.COMMUNITY, '글쓰기']} path={[PATH.COMMUNITY]} />
      <Section className="space-y-2">
        <div className="flex gap-2">
          <Select
            name="category"
            options={SELECT_OPTIONS_COMMUNITY_TYPE}
            defaultValue={SELECT_DEFAULT_OPTION}
            onChange={handleContentChange}
          />
          <Input
            id="title"
            name="title"
            placeholder="제목을 입력해주세요"
            className="grow"
            maxLength={100}
            value={title}
            onChange={handleContentChange}
          />
        </div>
        <Textarea
          name="content"
          className="min-h-96 w-full"
          maxLength={5000}
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={handleContentChange}
        />
        <Checkbox
          id="wantAnonymous"
          name="wantAnonymous"
          label="익명"
          checked={wantAnonymous}
          onChange={handleCheckboxChange}
        />
        <Button className="w-full" onClick={handleSubmitClick}>
          등록
        </Button>
      </Section>
    </Content>
  );
};

export default CommunityWritePage;
