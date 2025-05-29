import { useEffect, useState } from 'react';

import { Button, Checkbox, Input } from '@clab-platforms/design-system';
import { cn, toDecodeHTMLEntities } from '@clab-platforms/utils';

import { Section } from '@components/common/Section';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';
import Uploader from '@components/common/Uploader/Uploader';

import { ERROR_MESSAGE } from '@constants/message';
import { SELECT_OPTIONS_INQURIY_TYPE } from '@constants/select';
import {
  BOARD_CONTENT_MAX_LENGTH,
  BOARD_TITLE_MAX_LENGTH,
  INQUIRY_CATEGORY_STATE,
} from '@constants/state';
import { useToast } from '@hooks/common/useToast';
import { useBoardModifyMutation, useBoardWriteMutation } from '@hooks/queries';

import {
  InquiryCategoryType,
  InquiryItem,
  InquiryWriteItem,
} from '@type/inquiry';

const bugDefaultValue = `
🐞 버그 요약
- 어떤 문제가 있었나요? [여기에 버그를 간단히 설명해주세요]

🧪 재현 방법
1. 어떤 상황에서 발생했나요? [예: 로그인 후 게시글 작성 시]
2. 어떤 환경에서 발생했나요? [예: Chrome, iPhone]

✅ 기대한 동작
- 원래 어떻게 작동해야 하나요? [예: 작성 후 저장되어야 함]

📎 참고자료 (선택)
- 스크린샷이나 파일을 첨부해주셔도 좋아요!
`.trim();

const inquiryDefaultValue = `
💬 문의 또는 건의 내용
- 어떤 점이 궁금하거나, 개선하고 싶은 부분이 있으신가요? [예: 메뉴 위치 변경 건의, 동아리 활동 관련 문의]

🧠 배경 또는 이유
- 왜 이런 문의/건의를 하게 되었는지 알려주세요. [예: 찾기 어려워서 불편함, 올해 활동이 무엇이 있는지 궁금함]

📎 참고자료 또는 아이디어 (선택)
- 디자인, 예시 링크 등 추가 자료가 있다면 공유해주세요!
`.trim();

interface InquiryFormProps {
  category?: InquiryCategoryType;
  data?: InquiryItem;
  onClose?: () => void;
}

interface InquiryFormState extends Pick<InquiryWriteItem, 'title' | 'content'> {
  category: string;
  wantAnonymous: boolean;
}

const InquiryForm = ({
  category: strictCategory,
  data,
  onClose,
}: InquiryFormProps) => {
  const { addToast } = useToast();
  const { boardWriteMutate, isPending: boardWriteIsPending } =
    useBoardWriteMutation();
  const { boardModifyMutate, isPending: boardModifyIsPending } =
    useBoardModifyMutation();

  const [uploadFile, setUploadFile] = useState<File | undefined>();
  const [inquiryForm, setInquiryForm] = useState<InquiryFormState>({
    category:
      strictCategory ?? data?.category ?? SELECT_OPTIONS_INQURIY_TYPE[0].value,
    title: toDecodeHTMLEntities(data?.title) ?? '',
    content: toDecodeHTMLEntities(data?.content) ?? '',
    wantAnonymous: data?.id === null, // 익명일 경우 Null
  });

  const { category, title, content, wantAnonymous } = inquiryForm;

  const handleInquiryFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setInquiryForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleWantAnonymousChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInquiryForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };
  const handleSubmitClick = () => {
    if (!title || !content) {
      return addToast({
        state: 'error',
        message: ERROR_MESSAGE.NO_DATA,
      });
    }

    if (data) {
      // 게시글 수정
      boardModifyMutate({
        ...inquiryForm,
        id: data.id,
        file: uploadFile,
      });
      onClose?.();
    } else {
      // 게시글 작성
      boardWriteMutate({ ...inquiryForm, file: uploadFile });
    }
  };
  useEffect(() => {
    if (!data) {
      setInquiryForm((prev) => ({
        ...prev,
        content: '',
      }));
    }
  }, [category, data]);
  return (
    <Section>
      <div className="space-y-2">
        <div className="flex gap-2">
          {!strictCategory && (
            <div className="flex flex-col">
              <label htmlFor="category" className="mb-1 ml-1 text-xs">
                카테고리
              </label>
              <Select
                id="category"
                name="category"
                options={SELECT_OPTIONS_INQURIY_TYPE}
                disabled={!!strictCategory || !!data?.category}
                value={category}
                onChange={handleInquiryFormChange}
              />
            </div>
          )}
          <Input
            id="title"
            name="title"
            label="제목"
            placeholder="제목을 입력해주세요"
            className="grow"
            maxLength={BOARD_TITLE_MAX_LENGTH}
            value={title}
            onChange={handleInquiryFormChange}
          />
        </div>
        {category === INQUIRY_CATEGORY_STATE.BUG && (
          <Uploader
            label="오류 이미지"
            accept="image/*"
            onFileAccepted={setUploadFile}
          />
        )}
        <Textarea
          label="내용"
          name="content"
          className="min-h-96 w-full"
          value={
            content ||
            (category === INQUIRY_CATEGORY_STATE.BUG
              ? bugDefaultValue
              : category === INQUIRY_CATEGORY_STATE.INQUIRY
                ? inquiryDefaultValue
                : '')
          }
          placeholder="카테고리를 선택해주세요."
          maxLength={BOARD_CONTENT_MAX_LENGTH}
          onChange={handleInquiryFormChange}
        />
        <Checkbox
          id="wantAnonymous"
          name="wantAnonymous"
          label="익명"
          checked={wantAnonymous}
          onChange={handleWantAnonymousChange}
        />
        <div className="flex justify-end gap-2">
          {data && (
            // 수정 모드일 경우만 취소 버튼을 보여준다.
            <Button size="sm" color="red" onClick={onClose}>
              취소
            </Button>
          )}
          <Button
            size={data ? 'sm' : 'md'}
            className={cn({ 'w-full': !data })}
            onClick={handleSubmitClick}
            loading={boardWriteIsPending || boardModifyIsPending}
          >
            {data ? '수정' : '등록하기'}
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default InquiryForm;
