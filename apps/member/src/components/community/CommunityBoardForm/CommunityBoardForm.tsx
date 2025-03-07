import { useState } from 'react';

import { Button, Checkbox, Input } from '@clab-platforms/design-system';
import { cn, toDecodeHTMLEntities } from '@clab-platforms/utils';

import HashtagButton from '@components/common/HashtagButton/HashtagButton';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';
import Uploader from '@components/common/Uploader/Uploader';

import { ERROR_MESSAGE } from '@constants/message';
import {
  SELECT_DEFAULT_OPTION,
  SELECT_OPTIONS_COMMUNITY_TYPE,
} from '@constants/select';
import {
  BOARD_CONTENT_MAX_LENGTH,
  BOARD_TITLE_MAX_LENGTH,
} from '@constants/state';
import { useToast } from '@hooks/common/useToast';
import { useBoardModifyMutation, useBoardWriteMutation } from '@hooks/queries';

import type {
  CommunityCategoryType,
  CommunityPostDetailItem,
  CommunityWriteItem,
} from '@type/community';

/**
 * 커뮤니티 게시글 폼
 * 게시글을 추가하거나 수정할 수 있는 폼입니다.
 */
interface CommunityBoardFormProps {
  category?: CommunityCategoryType;
  data?: CommunityPostDetailItem;
  onClose?: () => void;
}

interface BoardFormState
  extends Pick<CommunityWriteItem, 'title' | 'content' | 'hashtagNames'> {
  category: CommunityCategoryType | typeof SELECT_DEFAULT_OPTION;
  wantAnonymous: boolean;
}

const CommunityBoardForm = ({
  category: strictCategory,
  data,
  onClose,
}: CommunityBoardFormProps) => {
  const { addToast } = useToast();
  const { boardWriteMutate, isPending: boardWriteIsPending } =
    useBoardWriteMutation();
  const { boardModifyMutate, isPending: boardModifyIsPending } =
    useBoardModifyMutation();

  const [uploadFile, setUploadFile] = useState<File | undefined>();
  const [boardForm, setBoardForm] = useState<BoardFormState>({
    category: strictCategory ?? data?.category ?? SELECT_DEFAULT_OPTION,
    title: toDecodeHTMLEntities(data?.title) ?? '',
    content: toDecodeHTMLEntities(data?.content) ?? '',
    wantAnonymous: data?.writerId === null, // 익명일 경우 Null
    hashtagNames: data?.boardHashtagInfos?.map((hashtag) => hashtag.name) ?? [],
  });

  const { category, title, content, wantAnonymous, hashtagNames } = boardForm;

  const handleBoardFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setBoardForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleWantAnonymousChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBoardForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSubmitClick = () => {
    if (!title || !content || category === SELECT_DEFAULT_OPTION) {
      return addToast({
        state: 'error',
        message: ERROR_MESSAGE.NO_DATA,
      });
    }

    if (data) {
      // 게시글 수정
      boardModifyMutate({
        ...boardForm,
        id: data.id,
        file: uploadFile,
      });
      onClose?.();
    } else {
      // 게시글 작성
      boardWriteMutate({ ...boardForm, file: uploadFile });
    }
  };

  const handleHashtagButtonClick = (value: string) => {
    setBoardForm((prev) => {
      const updatedHashtags = new Set(prev.hashtagNames);

      if (updatedHashtags.has(value)) {
        updatedHashtags.delete(value);
      } else {
        updatedHashtags.add(value);
      }

      return { ...prev, hashtagNames: [...updatedHashtags] };
    });
  };

  return (
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
              options={SELECT_OPTIONS_COMMUNITY_TYPE}
              disabled={!!strictCategory || !!data?.category}
              value={category}
              onChange={handleBoardFormChange}
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
          onChange={handleBoardFormChange}
        />
      </div>
      <Uploader
        label="썸네일"
        accept="image/*"
        onFileAccepted={setUploadFile}
      />
      <Textarea
        label="내용"
        name="content"
        className="min-h-96 w-full"
        placeholder="게시글의 내용을 입력해주세요."
        maxLength={BOARD_CONTENT_MAX_LENGTH}
        value={content}
        onChange={handleBoardFormChange}
      />
      {category === 'development_qna' && (
        <div>
          <label htmlFor="hashtag" className="mb-1 ml-1 text-xs">
            해시태그
          </label>
          <HashtagButton
            clicked={hashtagNames ?? []}
            onClick={handleHashtagButtonClick}
          />
        </div>
      )}
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
  );
};

export default CommunityBoardForm;
