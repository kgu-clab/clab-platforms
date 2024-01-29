import { ChangeEventHandler } from 'react';
import Textarea from '../Textarea/Textarea';
import { Button } from '@clab/design-system';

interface CommentInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onClick: () => void;
}

const CommentInput = ({ value, onChange, onClick }: CommentInputProps) => {
  return (
    <div className="flex gap-2">
      <Textarea
        className="border p-2 w-full"
        placeholder="댓글을 입력해주세요."
        value={value}
        onChange={onChange}
      />
      <Button className="whitespace-nowrap" onClick={onClick}>
        등록
      </Button>
    </div>
  );
};

export default CommentInput;
