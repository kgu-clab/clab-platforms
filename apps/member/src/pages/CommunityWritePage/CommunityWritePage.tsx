import { ChangeEvent, useCallback, useState } from 'react';

import { Button, Checkbox, Input } from '@clab/design-system';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';

import {
  SELECT_DEFAULT_OPTION,
  SELECT_OPTIONS_COMMUNITY_TYPE,
} from '@constants/select';
import useToast from '@hooks/common/useToast';
import { useBoardWriteMutation } from '@hooks/queries/useBoardWriteMutation';

const CommunityWritePage = () => {
  const toast = useToast();
  const { boardWriteMutate } = useBoardWriteMutation();

  const [postInfo, setPostInfo] = useState({
    category: SELECT_DEFAULT_OPTION,
    title: '',
    content: '',
    wantAnonymous: false,
  });

  const handleContentChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setPostInfo((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      }),
    [],
  );

  const handleCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setPostInfo((prev) => {
        return { ...prev, [e.target.name]: e.target.checked };
      }),
    [],
  );

  const handleSubmitClick = useCallback(() => {
    if (
      !postInfo.title ||
      !postInfo.content ||
      postInfo.category === SELECT_DEFAULT_OPTION
    ) {
      return toast({
        state: 'error',
        message: '모든 항목을 입력해주세요.',
      });
    }

    boardWriteMutate(postInfo);
  }, [boardWriteMutate, postInfo, toast]);

  return (
    <Content>
      <Header title={['커뮤니티', '글쓰기']} />
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
            value={postInfo.title}
            onChange={handleContentChange}
          />
        </div>
        <Textarea
          name="content"
          className="min-h-96 w-full"
          maxLength={2000}
          placeholder="내용을 입력해주세요."
          value={postInfo.content}
          onChange={handleContentChange}
        />
        <Checkbox
          id="wantAnonymous"
          name="wantAnonymous"
          label="익명"
          checked={postInfo.wantAnonymous}
          onChange={handleCheckboxChange}
        />
        <Button onClick={handleSubmitClick}>등록</Button>
      </Section>
    </Content>
  );
};

export default CommunityWritePage;
