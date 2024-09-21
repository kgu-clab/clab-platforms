import { useState } from 'react';

import { Button, Input, Menubar } from '@clab-platforms/design-system';

import ActivityPhotoBanner from '@components/common/ActivityPhotoBanner/ActivityPhotoBanner';
import { Section } from '@components/common/Section';
import Uploader from '@components/common/Uploader/Uploader';

import { PostActivityPhotoParams } from '@api/activity';
import { ERROR_MESSAGE } from '@constants/message';
import useToast from '@hooks/common/useToast';
import { useView } from '@hooks/common/useView';

import { useActivityPhotoMutation } from '../hooks/useActivityPhotoMutation';

interface InputsState extends Pick<PostActivityPhotoParams, 'date' | 'title'> {
  file?: File;
}

type View = 'VIEW' | 'ADD';

export function BannerSection() {
  const toast = useToast();
  const { view, handleViewClick } = useView<View>('VIEW');
  const { activityPhotoMutate } = useActivityPhotoMutation();

  const [inputs, setInputs] = useState<InputsState>({
    title: '',
    date: '',
    file: undefined,
  });

  const { title, date, file } = inputs;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileAccepted = (file?: File) => {
    setInputs((prev) => ({
      ...prev,
      file,
    }));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !date || !file) {
      return toast({
        state: 'error',
        message: ERROR_MESSAGE.NO_DATA,
      });
    }
    activityPhotoMutate({
      title: title,
      date: date,
      file: file,
    });
  };

  const renderView = {
    VIEW: (
      <form onSubmit={handleOnSubmit} className="space-y-2">
        <Input
          id="title"
          name="title"
          label="제목"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleInputChange}
        />
        <Input
          id="date"
          name="date"
          type="date"
          label="날짜"
          value={date}
          onChange={handleInputChange}
        />
        <Uploader
          label="사진"
          accept="image/*"
          onFileAccepted={handleFileAccepted}
        />
        <Button className="w-full">활동 사진 변경하기</Button>
      </form>
    ),
    ADD: <ActivityPhotoBanner />,
  }[view];

  return (
    <Section>
      <Section.Header
        title="활동 사진"
        description="홈 화면에 있는 활동 사진을 변경할 수 있어요"
      >
        <Menubar>
          <Menubar.Item
            selected={view === 'VIEW'}
            onClick={() => handleViewClick('VIEW')}
          >
            보기
          </Menubar.Item>
          <Menubar.Item
            selected={view === 'ADD'}
            onClick={() => handleViewClick('ADD')}
          >
            추가
          </Menubar.Item>
        </Menubar>
      </Section.Header>
      <Section.Body className="space-y-2">{renderView}</Section.Body>
    </Section>
  );
}
