import { PropsWithChildren, useState } from 'react';
import { useNavigate } from 'react-router';

import { Button, Grid, Input } from '@clab-platforms/design-system';
import { SearchOutline } from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

import Image from '@components/common/Image/Image';
import Label from '@components/common/Label/Label';
import { Section } from '@components/common/Section';
import Select from '@components/common/Select/Select';
import TextCounting from '@components/common/TextCounting/TextCounting';
import Textarea from '@components/common/Textarea/Textarea';

import { getSearchImage } from '@api/activity';
import { PATH } from '@constants/path';
import { SELECT_ACTIVITY_GROUP_CATEGORY_TYPE } from '@constants/select';
import {
  ACTIVITY_GROUP_CONTENT_MAX_LENGTH,
  ACTIVITY_GROUP_NAME_MAX_LENGTH,
  BOARD_TITLE_MAX_LENGTH,
} from '@constants/state';
import { useToast } from '@hooks/common/useToast';
import { useActivityGroupMutation } from '@hooks/queries';
import { toKoreaActivityGroupCategory } from '@utils/string';

import type { ActivityGroupCategoryType } from '@type/activity';

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
interface ComponentWithLabelProps extends PropsWithChildren {
  title: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
}

const ComponentWithLabel = ({
  title,
  htmlFor,
  required = false,
  className,
  children,
}: ComponentWithLabelProps) => {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} required={required}>
        {title}
      </Label>
      {children}
    </div>
  );
};

const CategoryOptions = Object.entries(SELECT_ACTIVITY_GROUP_CATEGORY_TYPE).map(
  ([key, value]) => ({
    name: toKoreaActivityGroupCategory(key as ActivityGroupCategoryType),
    value,
  }),
);
const GroupCreateSection = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { activityGroupMutate, activityGroupIsPending } =
    useActivityGroupMutation();
  const [photoList, setPhotoList] = useState<PhotoType[]>([]);
  const [photoKeyword, setPhotoKeyword] = useState('');
  const [inputs, setInputs] = useState<InputsType>({
    category: CategoryOptions[0].value,
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

  const handleApplyButtonClick = () => {
    if (subject.length === 0 || name.length === 0 || content.length === 0) {
      return addToast({
        state: 'error',
        message: '필수 입력 사항을 모두 입력해주세요.',
      });
    } else if (name.length > ACTIVITY_GROUP_NAME_MAX_LENGTH) {
      return addToast({
        state: 'error',
        message: `활동명은 ${ACTIVITY_GROUP_NAME_MAX_LENGTH}자 이내로 작성해주세요.`,
      });
    } else if (content.length > ACTIVITY_GROUP_CONTENT_MAX_LENGTH) {
      return addToast({
        state: 'error',
        message: `내용은 ${ACTIVITY_GROUP_CONTENT_MAX_LENGTH}자 이내로 작성해주세요.`,
      });
    } else if (curriculum) {
      if (curriculum.length > ACTIVITY_GROUP_CONTENT_MAX_LENGTH) {
        return addToast({
          state: 'error',
          message: `커리큘럼은 ${ACTIVITY_GROUP_CONTENT_MAX_LENGTH}자 이내로 작성해주세요.`,
        });
      }
    }

    activityGroupMutate(inputs, {
      onSuccess: () => navigate(PATH.ACTIVITY),
    });
  };

  const handleSearchClick = async () => {
    if (!photoKeyword)
      return addToast({
        state: 'error',
        message: '검색어를 입력해주세요.',
      });
    const images = await getSearchImage(photoKeyword);
    setPhotoList(images.results);
  };

  const handleImageClick = (selectedImage: string) => {
    setInputs((prev) => ({
      ...prev,
      imageUrl: selectedImage,
    }));
  };

  return (
    <Section>
      <Section.Body className="space-y-4">
        <Grid gap="md" col="2">
          <ComponentWithLabel title="카테고리" htmlFor="category" required>
            <Select
              id="category"
              name="category"
              className="w-full"
              options={CategoryOptions}
              value={category}
              onChange={onChange}
            />
          </ComponentWithLabel>
          <ComponentWithLabel title="대상" htmlFor="subject" required>
            <Input
              id="subject"
              name="subject"
              placeholder="활동 대상을 입력해주세요"
              className="grow"
              maxLength={BOARD_TITLE_MAX_LENGTH}
              value={subject}
              onChange={onChange}
            />
          </ComponentWithLabel>
        </Grid>
        <ComponentWithLabel title="활동명" htmlFor="name" required>
          <Input
            id="name"
            name="name"
            placeholder="활동명을 입력해주세요"
            className="grow"
            maxLength={BOARD_TITLE_MAX_LENGTH}
            value={name}
            onChange={onChange}
          />
          <TextCounting
            maxLength={ACTIVITY_GROUP_NAME_MAX_LENGTH}
            text={name}
          />
        </ComponentWithLabel>
        <ComponentWithLabel
          title="이미지"
          htmlFor="photoKeywords"
          className="flex flex-col"
        >
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
              onClick={() => handleSearchClick()}
            />
          </div>
          <Grid gap="sm" col="2">
            {photoList &&
              photoList.slice(0, 6)?.map((photoItem) => (
                <Image
                  onClick={() => handleImageClick(photoItem.urls['full'])}
                  height="max-h-[200px]"
                  overflow
                  key={photoItem.id}
                  src={photoItem.urls['full']}
                  className={cn(
                    'rounded-md object-cover transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:opacity-50',
                    {
                      'border-4 border-red-500':
                        inputs.imageUrl === photoItem.urls['full'],
                    },
                  )}
                />
              ))}
          </Grid>
        </ComponentWithLabel>
        <ComponentWithLabel title="내용" htmlFor="content" required>
          <Textarea
            id="content"
            name="content"
            placeholder="활동 내용을 작성해주세요"
            className="scrollbar-hide h-48 w-full resize-none"
            value={content}
            onChange={onChange}
          />
          <TextCounting
            maxLength={ACTIVITY_GROUP_CONTENT_MAX_LENGTH}
            text={content}
          />
        </ComponentWithLabel>
        <ComponentWithLabel title="커리큘럼" htmlFor="curriculum">
          <Textarea
            id="curriculum"
            name="curriculum"
            placeholder="커리큘럼을 작성해주세요"
            className="scrollbar-hide h-64 w-full resize-none"
            value={curriculum}
            onChange={onChange}
          />
          <TextCounting
            maxLength={ACTIVITY_GROUP_CONTENT_MAX_LENGTH}
            text={curriculum}
          />
        </ComponentWithLabel>
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
        <ComponentWithLabel title="기술 스택" htmlFor="techStack">
          <Input
            id="techStack"
            name="techStack"
            placeholder="기술스택을 입력해주세요"
            className="grow"
            maxLength={BOARD_TITLE_MAX_LENGTH}
            value={techStack}
            onChange={onChange}
          />
        </ComponentWithLabel>
        <ComponentWithLabel title="Github" htmlFor="githubUrl">
          <Input
            id="githubUrl"
            name="githubUrl"
            placeholder="https://github.com/kgu-clab"
            className="grow"
            maxLength={BOARD_TITLE_MAX_LENGTH}
            value={githubUrl}
            onChange={onChange}
          />
        </ComponentWithLabel>
        <Button
          className="w-full"
          onClick={handleApplyButtonClick}
          disabled={activityGroupIsPending}
        >
          새로운 그룹 추가하기
        </Button>
      </Section.Body>
    </Section>
  );
};

export default GroupCreateSection;
