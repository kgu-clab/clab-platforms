import { useCallback } from 'react';

import { Button } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import Textarea from '@components/common/Textarea/Textarea';

import { useToast } from '@hooks/common/useToast';
import {
  useAnswerModifyMutation,
  useAnswerWriteMutation,
} from '@hooks/queries';

import type { SupportAnswerItem } from '@type/support';

interface SupportAnswerInputProps {
  onCancel?: () => void;
  className?: string;
  setAnswer: (answer: SupportAnswerItem) => void;
  answer: SupportAnswerItem;
  isAnswered?: boolean;
}

const SupportAnswerInput = ({
  className,
  onCancel,
  setAnswer,
  answer,
  isAnswered = false,
}: SupportAnswerInputProps) => {
  const { addToast } = useToast();
  const { content, id } = answer;

  const { answerWriteMutate, isPending: isWritePending } =
    useAnswerWriteMutation();
  const { answerModifyMutate, isPending: isModifyPending } =
    useAnswerModifyMutation();
  const handleAnswerChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setAnswer({
        ...answer,
        content: e.target.value,
      });
    },
    [answer, setAnswer],
  );
  const handleSubmit = useCallback(() => {
    if (!content || content.trim() === '') {
      addToast({
        state: 'error',
        message: '답변 내용을 입력해주세요.',
      });
      return;
    }

    if (!id) {
      addToast({
        state: 'error',
        message: '해당하는 문의글을 찾을 수 없어요',
      });
      return;
    }

    const mutationOptions = {
      onSuccess: () => {
        onCancel?.();
        addToast({
          state: 'success',
          message: isAnswered ? '답변이 수정되었어요' : '답변이 등록되었어요',
        });
      },
      onError: () => {
        addToast({
          state: 'error',
          message: '답변 등록 중 오류가 발생했어요.',
        });
      },
    };

    if (isAnswered) {
      answerModifyMutate(
        {
          id: id,
          content: content.trim(),
        },
        mutationOptions,
      );
    } else {
      answerWriteMutate(
        {
          id: id,
          content: content.trim(),
        },
        mutationOptions,
      );
    }
  }, [
    content,
    id,
    isAnswered,
    answerModifyMutate,
    answerWriteMutate,
    onCancel,
    addToast,
  ]);

  const isPending = isWritePending || isModifyPending;

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <Textarea
          className="size-full resize-none border p-3"
          placeholder="답변을 입력해주세요."
          maxLength={1000}
          value={content}
          onChange={handleAnswerChange}
          rows={4}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button size="sm" onClick={onCancel}>
          취소
        </Button>
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={!content || isPending}
        >
          {isAnswered ? '수정하기' : '등록하기'}
        </Button>
      </div>
    </div>
  );
};
export default SupportAnswerInput;
