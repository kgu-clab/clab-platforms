import { useState } from 'react';

import { Button, Grid, Input } from '@clab/design-system';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Label from '@components/common/Label/Label';
import Section from '@components/common/Section/Section';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';

import {
  BOARD_CONTENT_MAX_LENGTH,
  BOARD_TITLE_MAX_LENGTH,
} from '@constants/state';
import useToast from '@hooks/common/useToast';

const GroupCreatePage = () => {
  const toast = useToast();

  const options = [
    {
      name: 'STUDY',
      value: 'STUDY',
    },
    {
      name: 'PROJECT',
      value: 'PROJECT',
    },
  ];

  const [inputs, setInputs] = useState({
    category: 'STUDY',
    subject: '',
    name: '',
    content: '',
    imageUrl: '',
    curriculum: '',
    startDate: '',
    endDate: '',
    techStack: '',
    githubUrl: '',
  });
  const {
    category,
    subject,
    name,
    content,
    curriculum,
    startDate,
    endDate,
    techStack,
    githubUrl,
  } = inputs;
  const onChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onClickApply = () => {
    if (subject.length === 0 || name.length === 0 || content.length === 0) {
      return toast({
        state: 'error',
        message: '필수 입력 사항을 모두 입력해주세요.',
      });
    }
    alert('추가되었습니다.');
  };
  return (
    <Content>
      <Header title={['활동', '새로운 그룹 만들기']} />
      <Section className="space-y-4">
        <Grid gap="md" col="2">
          <div>
            <Label htmlFor="select" required>
              카테고리
            </Label>
            <Select
              id="select"
              name="select"
              className="w-full"
              options={options}
              value={category}
              onChange={onChange}
            />
          </div>
          <div>
            <Label htmlFor="subject" required>
              대상
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="활동 대상을 입력해주세요"
              className="grow"
              maxLength={BOARD_TITLE_MAX_LENGTH}
              value={subject}
              onChange={onChange}
            />
          </div>
        </Grid>
        <div>
          <Label htmlFor="name" required>
            활동명
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="활동명을 입력해주세요"
            className="grow"
            maxLength={BOARD_TITLE_MAX_LENGTH}
            value={name}
            onChange={onChange}
          />
        </div>
        <div>
          <Label htmlFor="content" required>
            내용
          </Label>
          <Textarea
            id="content"
            name="content"
            placeholder="활동 내용을 작성해주세요"
            className="scrollbar-hide h-80 w-full resize-none"
            maxLength={BOARD_CONTENT_MAX_LENGTH}
            value={content}
            onChange={onChange}
          />
        </div>
        <div>
          <Label htmlFor="curriculum">커리큘럼</Label>
          <Textarea
            id="curriculum"
            name="curriculum"
            placeholder="커리큘럼을 작성해주세요"
            className="scrollbar-hide h-80 w-full resize-none"
            maxLength={BOARD_CONTENT_MAX_LENGTH}
            value={curriculum}
            onChange={onChange}
          />
        </div>
        <Grid gap="md" col="2">
          <Input
            label="시작일"
            type="datetime-local"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={onChange}
          />
          <Input
            label="종료일"
            type="datetime-local"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={onChange}
          />
        </Grid>
        <div>
          <Label htmlFor="techStack">기술 스택</Label>
          <Input
            id="techStack"
            name="techStack"
            placeholder="기술스택을 입력해주세요"
            className="grow"
            maxLength={BOARD_TITLE_MAX_LENGTH}
            value={techStack}
            onChange={onChange}
          />
        </div>
        <div>
          <Label htmlFor="githubUrl">GithubUrl</Label>
          <Input
            id="githubUrl"
            name="githubUrl"
            placeholder="github URL을 입력해주세요"
            className="grow"
            maxLength={BOARD_TITLE_MAX_LENGTH}
            value={githubUrl}
            onChange={onChange}
          />
        </div>
        <Button className="w-full" onClick={onClickApply}>
          새로운 그룹 추가하기
        </Button>
      </Section>
    </Content>
  );
};

export default GroupCreatePage;
