import { useState } from 'react';
import Textarea from '../Textarea/Textarea';
import { Button, Input } from '@clab/design-system';
import { useCommentWriteMutation } from '@hooks/queries/useCommentWriteMutation';

interface CommentInputProps {
  id: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  parentId?: number;
}

const CommentInput = ({ id, value, onChange, parentId }: CommentInputProps) => {
  const { commentWriteInfo } = useCommentWriteMutation();

  const [anonymous, setAnonymous] = useState(false);

  const handleAnonymousToggle = () => {
    setAnonymous(!anonymous);
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
    <div className="flex gap-2">
      <Textarea
        className="border p-2 w-full"
        placeholder="댓글을 입력해주세요."
        value={value}
        onChange={onChange}
      />
      <div className="flex flex-col justify-between">
        <div className="flex">
          <Input
            id={String(id)}
            name="wantAnonymous"
            type="checkbox"
            checked={anonymous}
            onChange={handleAnonymousToggle}
          />
          <span className="pl-1 text-xs">익명</span>
        </div>
        <Button className="whitespace-nowrap" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
