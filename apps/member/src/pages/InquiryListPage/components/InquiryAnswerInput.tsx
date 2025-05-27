import { useState } from 'react';

import { Button } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import Textarea from '@components/common/Textarea/Textarea';

import { useToast } from '@hooks/common/useToast';

interface InquiryAnswerInputProps {
  data: string;
  onCancel?: () => void;
  className?: string;
}

const InquiryAnswerInput = ({
  data,
  className,
  onCancel,
}: InquiryAnswerInputProps) => {
  const { addToast } = useToast();

  const [answer, setAnswer] = useState(data);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (!answer.trim()) {
      addToast({
        state: 'error',
        message: '답변 내용을 입력해주세요.',
      });
      return;
    }

    addToast({
      state: 'success',
      message: '답변이 등록되었습니다.',
    });

    setAnswer('');
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <Textarea
          className="size-full resize-none border p-3"
          placeholder="답변을 입력해주세요."
          maxLength={1000}
          value={answer}
          onChange={handleAnswerChange}
          rows={4}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button size="sm" onClick={onCancel}>
          취소
        </Button>
        <Button size="sm" onClick={handleSubmit} disabled={!answer.trim()}>
          답변 등록
        </Button>
      </div>
    </div>
  );
};

export default InquiryAnswerInput;
