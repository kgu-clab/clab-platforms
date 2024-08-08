import { useState } from 'react';

import { Button, Grid, Input } from '@clab/design-system';
import { SearchOutline } from '@clab/icon';
import { cn } from '@clab/utils';

import Image from '@components/common/Image/Image';
import Label from '@components/common/Label/Label';
import { Section } from '@components/common/Section';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';

import { getSearchImage } from '@api/activity';
import {
  BOARD_CONTENT_MAX_LENGTH,
  BOARD_TITLE_MAX_LENGTH,
} from '@constants/state';
import useToast from '@hooks/common/useToast';
import { useActivityGroupMutation } from '@hooks/queries/activity/useActivityGroupMutation';

import { ActivityGroupCategoryType } from '@type/activity';

interface PhotoType {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
}
interface InputsType {
  category: ActivityGroupCategoryType;
  subject: string;
  name: string;
  content: string;
  imageUrl?: string;
  curriculum?: string;
  startDate?: string;
  endDate?: string;
  techStack?: string;
  githubUrl?: string;
}

const GroupCreateSection = () => {
  const toast = useToast();
  const { activityGroupMutate } = useActivityGroupMutation();
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
  const [photoList, setPhotoList] = useState<PhotoType[]>([]);
  const [photoKeyword, setPhotoKeyword] = useState('');
  const [inputs, setInputs] = useState<InputsType>({
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
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickApply = () => {
    if (subject.length === 0 || name.length === 0 || content.length === 0) {
      return toast({
        state: 'error',
        message: '필수 입력 사항을 모두 입력해주세요.',
      });
    }
    activityGroupMutate(inputs);
  };

  const handleSearchImage = async () => {
    if (!photoKeyword)
      return toast({
        state: 'error',
        message: '검색어를 입력해주세요.',
      });
    const images = await getSearchImage(photoKeyword);
    setPhotoList(images.results);
  };

  const handleClickImage = (selectedImage: string) => {
    setInputs((prev) => ({
      ...prev,
      imageUrl: selectedImage,
    }));
  };

  return (
    <Section>
      <Section.Body className="space-y-4">
        <Grid gap="md" col="2">
          <div>
            <Label htmlFor="category" required>
              카테고리
            </Label>
            <Select
              id="category"
              name="category"
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
        <div className="flex flex-col">
          <Label htmlFor="photoKeywords">이미지</Label>
          <div className="mb-2 flex gap-2">
            <Input
              id="photoKeyword"
              name="photoKeyword"
              placeholder="사진 선택을 위한 키워드를 영어로 입력해주세요 ex) java"
              className="grow"
              maxLength={BOARD_TITLE_MAX_LENGTH}
              value={photoKeyword}
              onChange={(e) => setPhotoKeyword(e.target.value)}
            />
            <SearchOutline
              width={20}
              height={20}
              className="m-auto hover:cursor-pointer"
              onClick={() => handleSearchImage()}
            />
          </div>
          <Grid gap="sm" col="2">
            {photoList &&
              photoList.slice(0, 6)?.map((photoItem) => (
                <Image
                  onClick={() => handleClickImage(photoItem.urls['full'])}
                  height="max-h-[200px]"
                  overflow
                  key={photoItem.id}
                  src={photoItem.urls['full']}
                  className={cn(
                    'rounded-md object-cover transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:opacity-50',
                    {
                      'opacity-50': inputs.imageUrl === photoItem.urls['full'],
                    },
                  )}
                />
              ))}
          </Grid>
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
      </Section.Body>
    </Section>
  );
};

export default GroupCreateSection;
