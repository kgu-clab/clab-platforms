import { useState } from 'react';

import { Button, Input } from '@clab-platforms/design-system';

import Hr from '@components/common/Hr/Hr';
import { Section } from '@components/common/Section';
import Uploader from '@components/common/Uploader/Uploader';
import MainBanner from '@components/main/MainBanner/MainBanner';

import { PostActivityPhotoParams } from '@api/activity';
import { ERROR_MESSAGE } from '@constants/message';
import useToast from '@hooks/common/useToast';
import { useActivityPhotoMutation } from '@hooks/queries';

interface InputsState extends Pick<PostActivityPhotoParams, 'date' | 'title'> {
  file?: File;
}

const ManageBannerSection = () => {
  const toast = useToast();
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

  return (
    <Section>
      <Section.Header
        title="활동 사진"
        description="홈 화면에 있는 활동 사진을 변경할 수 있어요"
      />
      <Section.Body className="space-y-2">
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
        <Hr>현재 활동 사진</Hr>
        <MainBanner />
      </Section.Body>
    </Section>
  );
};

export default ManageBannerSection;
