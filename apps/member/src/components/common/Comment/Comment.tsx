import { useCallback } from 'react';

import { MODAL_ACCEPT, MODAL_CONTENT, MODAL_TITLE } from '@constants/modal';
import useModal from '@hooks/common/useModal';
import { useAccusesMutation, useCommentDeleteMutation } from '@hooks/queries';
import { formattedDate } from '@utils/date';
import { cn, formatMemberName, toDecodeHTMLEntities } from '@utils/string';

import type { CommentListItem } from '@type/comment';

import ActionButton from '../ActionButton/ActionButton';
import Avatar from '../Avatar/Avatar';

interface CommentProps extends Omit<CommentListItem, 'content' | 'children'> {
  children: string;
  onClickReply: () => void;
  isReply?: boolean;
}

const Comment = ({
  id,
  writerId,
  writerName,
  writerRoleLevel,
  writerImageUrl,
  createdAt,
  children,
  isOwner,
  isDeleted,
  isReply,
  onClickReply,
}: CommentProps) => {
  const { openModal } = useModal();
  const { commentDeleteMutate } = useCommentDeleteMutation();
  const { accusesMutate } = useAccusesMutation();

  const handleDeleteClick = useCallback(
    (id: number) => {
      return openModal({
        title: MODAL_TITLE.DELETE,
        content: MODAL_CONTENT.DELETE,
        accept: {
          text: MODAL_ACCEPT.DELETE,
          onClick: () => commentDeleteMutate(id),
        },
      });
    },
    [commentDeleteMutate, openModal],
  );

  const handleReportClick = useCallback(
    (id: number) => {
      return openModal({
        title: MODAL_TITLE.REPORT,
        content: MODAL_CONTENT.REPORT,
        accept: {
          text: MODAL_ACCEPT.REPORT,
          onClick: () => {
            accusesMutate({
              targetType: 'COMMENT',
              targetId: id,
              reason: '부적절한 댓글입니다.',
            });
          },
        },
      });
    },
    [accusesMutate, openModal],
  );

  return (
    <div
      className={cn('flex', {
        'border-l pl-5 last:border-l-white': isReply,
      })}
    >
      <Avatar src={writerImageUrl} roleLevel={writerRoleLevel} />
      <div className="ml-3 w-full text-sm">
        <p className="font-semibold">
          {formatMemberName(writerName, writerId)}
        </p>
        {isDeleted ? (
          <p className="text-red-500">삭제된 댓글입니다.</p>
        ) : (
          <p className="whitespace-pre-wrap">
            {toDecodeHTMLEntities(children)}
          </p>
        )}
        <div className="flex justify-end gap-4">
          <p className="text-gray-500">{formattedDate(createdAt)}</p>

          {isOwner ? (
            <ActionButton onClick={() => handleDeleteClick(id)}>
              삭제
            </ActionButton>
          ) : (
            <ActionButton onClick={() => handleReportClick(id)}>
              신고
            </ActionButton>
          )}
          {!isReply && (
            <ActionButton onClick={onClickReply}>답글 쓰기</ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
