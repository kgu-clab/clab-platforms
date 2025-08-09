import { useEffect, useState } from 'react';

import { Button, Checkbox, Input } from '@clab-platforms/design-system';
import { cn, toDecodeHTMLEntities } from '@clab-platforms/utils';

import { Section } from '@components/common/Section';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';
import Uploader from '@components/common/Uploader/Uploader';

import { ERROR_MESSAGE } from '@constants/message';
import { SELECT_OPTIONS_INQUIRY_TYPE } from '@constants/select';
import {
  SUPPORT_CATEGORY_STATE,
  SUPPORT_CONTENT_MAX_LENGTH,
  SUPPORT_TITLE_MAX_LENGTH,
} from '@constants/state';
import { useToast } from '@hooks/common/useToast';
import {
  useSupportModifyMutation,
  useSupportWriteMutation,
} from '@hooks/queries';

import type { SupportCategoryType, SupportWriteItem } from '@type/support';

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

interface SupportFormProps {
  category?: SupportCategoryType;
  data?: SupportWriteItem;
  onClose?: () => void;
}

interface SupportFormState extends Pick<SupportWriteItem, 'title' | 'content'> {
  category: SupportCategoryType;
  wantAnonymous: boolean;
}

const SupportForm = ({
  category: strictCategory,
  data,
  onClose,
}: SupportFormProps) => {
  const { addToast } = useToast();

  const { supportWriteMutate, isPending: supportWriteIsPending } =
    useSupportWriteMutation();
  const { supportModifyMutate, isPending: supportModifyIsPending } =
    useSupportModifyMutation();

  const [uploadFile, setUploadFile] = useState<File | undefined>();
  const [supportForm, setSupportForm] = useState<SupportFormState>({
    category: strictCategory ?? data?.category ?? SUPPORT_CATEGORY_STATE.BUG,
    title: toDecodeHTMLEntities(data?.title) ?? '',
    content: toDecodeHTMLEntities(data?.content) ?? '',
    wantAnonymous: data?.id === null, // 익명일 경우 Null
  });

  const { category, title, content, wantAnonymous } = supportForm;

  const handleSupportFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setSupportForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleWantAnonymousChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSupportForm((prev) => ({
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
      // 문의 수정
      if (data.id) {
        supportModifyMutate({
          id: data.id,
          file: uploadFile,
          ...supportForm,
        });
      }
      onClose?.();
    } else {
      // 문의 작성
      supportWriteMutate({ ...supportForm, file: uploadFile });
    }
  };
  useEffect(() => {
    if (!data) {
      setSupportForm((prev) => ({
        ...prev,
        content: '',
      }));
    }
  }, [category, data]);
  const getDefaultContent = () => {
    if (content) return content;
    if (category === SUPPORT_CATEGORY_STATE.BUG) return bugDefaultValue;
    if (category === SUPPORT_CATEGORY_STATE.INQUIRY) return inquiryDefaultValue;
    return '';
  };
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
                options={SELECT_OPTIONS_INQUIRY_TYPE}
                disabled={!!strictCategory || !!data?.category}
                value={category}
                onChange={handleSupportFormChange}
              />
            </div>
          )}
          <Input
            id="title"
            name="title"
            label="제목"
            placeholder="제목을 입력해주세요"
            className="grow"
            maxLength={SUPPORT_TITLE_MAX_LENGTH}
            value={title}
            onChange={handleSupportFormChange}
          />
        </div>
        <Uploader
          label="오류 이미지"
          accept="image/*"
          onFileAccepted={setUploadFile}
        />
        <Textarea
          label="내용"
          name="content"
          className="min-h-96 w-full"
          value={getDefaultContent()}
          placeholder="카테고리를 선택해주세요."
          maxLength={SUPPORT_CONTENT_MAX_LENGTH}
          onChange={handleSupportFormChange}
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
            loading={supportWriteIsPending || supportModifyIsPending}
          >
            {data ? '수정' : '등록하기'}
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default SupportForm;
