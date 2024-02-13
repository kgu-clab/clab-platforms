import { Button } from '@clab/design-system';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Input from '@components/common/Input/Input';
import Section from '@components/common/Section/Section';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';
import { useCommunityWriteMutation } from '@hooks/queries/useCommunityWriteMutation';
import { useCallback, useState } from 'react';

const selectOptions = [
  { id: 1, name: '공지사항' },
  { id: 2, name: '자유' },
  { id: 3, name: 'QnA' },
  { id: 4, name: '졸업생 게시판' },
];

const CommunityWritePage = () => {
  const { communityWriteMutate } = useCommunityWriteMutation();
  const [content, setContent] = useState({
    category: 0,
    title: '',
    content: '',
    wantAnnonymous: false,
  });

  const handleContent = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const value =
        e.target.type === 'checkbox' ? !content.wantAnnonymous : e.target.value;
      setContent((prev) => {
        return { ...prev, [e.target.name]: value };
      });
    },
    [],
  );

  const onClickSubmit = () => {
    const categoryName = selectOptions[content.category - 1].name;
    communityWriteMutate({ ...content, category: categoryName });
  };

  return (
    <Content>
      <Header title={['커뮤니티', '글쓰기']} />
      <Section className="space-y-2">
        <div className="flex gap-2">
          <Select
            name="category"
            data={selectOptions}
            value={content.category}
            onChange={handleContent}
          />
          <Input
            className="grow"
            name="title"
            type="text"
            placeholder="제목을 입력해주세요"
            value={content.title}
            onChange={handleContent}
          />
        </div>
        <Textarea
          name="content"
          className="min-h-80"
          placeholder="내용을 입력해주세요."
          value={content.content}
          onChange={handleContent}
        />
        <div>
          <Input
            name="wantAnnonymous"
            type="checkbox"
            value={String(content.wantAnnonymous)}
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
