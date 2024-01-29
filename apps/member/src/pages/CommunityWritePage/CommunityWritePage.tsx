import { Button } from '@clab/design-system';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Input from '@components/common/Input/Input';
import Section from '@components/common/Section/Section';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';
import { useCallback, useState } from 'react';

const selectOptions = [
  { id: 1, name: '공지사항' },
  { id: 2, name: '자유' },
  { id: 3, name: 'QnA' },
  { id: 4, name: '졸업생 게시판' },
];

const CommunityWritePage = () => {
  const [content, setContent] = useState({
    type: 0,
    title: '',
    content: '',
  });

  const handleContent = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setContent((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    },
    [],
  );

  return (
    <Content>
      <Header title={['커뮤니티', '글쓰기']} />
      <Section className="space-y-2">
        <div className="flex gap-2">
          <Select
            name="type"
            data={selectOptions}
            value={content.type}
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
        <Button>등록</Button>
      </Section>
    </Content>
  );
};

export default CommunityWritePage;
