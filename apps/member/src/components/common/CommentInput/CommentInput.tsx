import { useState } from 'react';
import Textarea from '../Textarea/Textarea';
import { Button, Checkbox } from '@clab/design-system';
import { useCommentWriteMutation } from '@hooks/queries/useCommentWriteMutation';
import { cn } from '@utils/string';

interface CommentInputProps {
  id: string;
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
  const { commentWriteInfo } = useCommentWriteMutation();

  const [anonymous, setAnonymous] = useState(false);

  const handleAnonymousToggle = () => {
    setAnonymous((prev) => !prev);
  };

  const handleSubmit = () => {
    if (parentId) {
      commentWriteInfo({
        parentId: parentId,
        boardId: id,
        body: { content: value, wantAnonymous: anonymous },
      });
    } else {
      commentWriteInfo({
        boardId: id,
        body: { content: value, wantAnonymous: anonymous },
      });
    }
    onChange({
      target: { value: '' },
    } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Textarea
        className="w-full h-full p-2 border resize-none"
        placeholder="댓글을 입력해주세요."
        maxLength={200}
        value={value}
        onChange={onChange}
      />
      <div className="flex flex-col justify-between text-nowrap">
        <Checkbox
          label="익명"
          name="wantAnonymous"
          type="checkbox"
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
