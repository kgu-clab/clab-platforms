import { useState } from 'react';

import { Button, Checkbox } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import { useCommentCreateMutation } from '@hooks/queries';

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

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Textarea
        className="size-full resize-none border p-2"
        placeholder="댓글을 입력해주세요."
        maxLength={1000}
        value={value}
        onChange={onChange}
      />
      <div className="flex flex-col justify-between text-nowrap">
        <Checkbox
          id="wantAnonymous"
          name="wantAnonymous"
          label="익명"
          checked={anonymous}
          onChange={handleAnonymousToggle}
        />
        <Button className="whitespace-nowrap" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
