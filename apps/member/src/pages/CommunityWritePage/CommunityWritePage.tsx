import { ChangeEvent, useState } from 'react';
import { Button, Input } from '@clab/design-system';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';
import { useBoardWriteMutation } from '@hooks/queries/useBoardWriteMutation';
import { DEFAULT } from '@constants/default';

// name이 category와 매치되어야 합니다.
const selectOptions = [
  { value: 1, name: '자유' },
  { value: 2, name: 'QnA' },
  { value: 3, name: '졸업생' },
];

const CommunityWritePage = () => {
  const { boardWriteMutate } = useBoardWriteMutation();

  const [content, setContent] = useState({
    category: 0,
    title: '',
    content: '',
    wantAnonymous: false,
  });

  const handleContent = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const value =
      e.target.type === 'checkbox' ? !content.wantAnonymous : e.target.value;
    setContent((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };

  const onClickSubmit = () => {
    const categoryName = selectOptions[content.category - 1]?.name;
    boardWriteMutate({ ...content, category: categoryName });
  };

  return (
    <Content>
      <Header title={['커뮤니티', '글쓰기']} />
      <Section className="space-y-2">
        <div className="flex gap-2">
          <Select
            name="category"
            options={selectOptions}
            defaultValue={DEFAULT.SELECT}
            onChange={handleContent}
          />
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="제목을 입력해주세요"
            maxLength={60}
            className="grow"
            value={content.title}
            onChange={handleContent}
          />
        </div>
        <Textarea
          name="content"
          className="w-full min-h-96"
          maxLength={1000}
          placeholder="내용을 입력해주세요."
          value={content.content}
          onChange={handleContent}
        />
        <div className="flex items-center">
          <Input
            id="wantAnonymous"
            name="wantAnonymous"
            type="checkbox"
            value={String(content.wantAnonymous)}
            onChange={handleContent}
          />
          <span className="pl-2">익명</span>
        </div>
        <Button onClick={onClickSubmit}>등록</Button>
      </Section>
    </Content>
  );
};

export default CommunityWritePage;
