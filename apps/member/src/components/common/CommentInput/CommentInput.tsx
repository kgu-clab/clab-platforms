import { useState } from 'react';

import { Button, Checkbox } from '@clab-platforms/design-system';
import EmojiAdd from '@clab-platforms/icon/src/outline/react/EmojiAdd';
import { cn } from '@clab-platforms/utils';

import { useCommentCreateMutation } from '@hooks/queries';
import { EmojiPicker } from 'frimousse';

import Textarea from '../Textarea/Textarea';

interface CommentInputProps {
  id: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  parentId?: number;
  className?: string;
}

const CommentInput = ({
  id,
  value,
  onChange,
  parentId,
  className,
}: CommentInputProps) => {
  const { commentWriteInfo } = useCommentCreateMutation();

  const [anonymous, setAnonymous] = useState(false);
  const [isShowEmoji, setIsShowEmoji] = useState(false);

  const handleAnonymousToggle = () => {
    setAnonymous((prev) => !prev);
  };

  const handleSubmit = () => {
    commentWriteInfo({
      parentId,
      boardId: id,
      body: { content: value, wantAnonymous: anonymous },
    });

    onChange({
      target: { value: '' },
    } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  const handleEmojiButtonClick = (emoji: string) => {
    onChange({
      target: { value: value + emoji },
    } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  return (
    <>
      <div className={cn('flex items-center gap-2', className)}>
        <Textarea
          className="size-full resize-none border p-2"
          placeholder="댓글을 입력해주세요."
          maxLength={1000}
          value={value}
          onChange={onChange}
        />
        <div className="relative flex flex-col justify-between gap-2 text-nowrap">
          <button
            type="button"
            className="flex justify-center"
            onClick={() => setIsShowEmoji(!isShowEmoji)}
          >
            <EmojiAdd />
          </button>
          {isShowEmoji && (
            <EmojiPicker.Root
              className="absolute right-0 isolate mt-12 flex h-[368px] w-fit flex-col rounded-md bg-white"
              onEmojiSelect={(emoji) => handleEmojiButtonClick(emoji.emoji)}
            >
              <EmojiPicker.Search className="z-10 mx-2 mt-2 appearance-none rounded-md bg-neutral-100 px-2.5 py-2 text-sm" />
              <EmojiPicker.Viewport className="outline-hidden relative flex-1">
                <EmojiPicker.Loading className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400">
                  로딩중이예요
                </EmojiPicker.Loading>
                <EmojiPicker.Empty className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400">
                  이모티콘이 없어요.
                </EmojiPicker.Empty>
                <EmojiPicker.List
                  className="select-none pb-1.5"
                  components={{
                    CategoryHeader: ({ category, ...props }) => (
                      <div
                        className="bg-white px-3 pb-1.5 pt-3 text-xs font-medium text-neutral-600"
                        {...props}
                      >
                        {category.label}
                      </div>
                    ),
                    Row: ({ children, ...props }) => (
                      <div className="scroll-my-1.5 px-1.5" {...props}>
                        {children}
                      </div>
                    ),
                    Emoji: ({ emoji, ...props }) => (
                      <button
                        className="flex size-8 items-center justify-center rounded-md text-lg data-[active]:bg-neutral-100"
                        {...props}
                      >
                        {emoji.emoji}
                      </button>
                    ),
                  }}
                />
              </EmojiPicker.Viewport>
            </EmojiPicker.Root>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-3">
        <Checkbox
          id="wantAnonymous"
          name="wantAnonymous"
          label="익명"
          checked={anonymous}
          onChange={handleAnonymousToggle}
        />
        <Button className="whitespace-nowrap py-1" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </>
  );
};

export default CommentInput;
