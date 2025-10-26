import { ThumbUpOutline } from '@clab-platforms/icon';
import { cn, toDecodeHTMLEntities } from '@clab-platforms/utils';

import { MODAL_ACCEPT, MODAL_CONTENT, MODAL_TITLE } from '@constants/modal';
import { useModal } from '@hooks/common/useModal';
import { useAccusesMutation, useCommentDeleteMutation } from '@hooks/queries';
import { useCommentLikesMutation } from '@hooks/queries/comment/useCommentLikesMutation';
import { formattedDate, toKoreaISOString } from '@utils/date';
import { formatMemberName } from '@utils/string';

import type { CommentListItem } from '@type/comment';

import ActionButton from '../ActionButton/ActionButton';
import Avatar from '../Avatar/Avatar';
import ReactionButton from '../ReactionButton/ReactionButton';

interface Props extends Omit<CommentListItem, 'content' | 'children'> {
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
  likes,
}: Props) => {
  const { open } = useModal();
  const { commentDeleteMutate } = useCommentDeleteMutation();
  const { accusesMutate } = useAccusesMutation();
  const { commentLikesMutate, isPending } = useCommentLikesMutation();

  const handleDeleteClick = (id: number) => {
    return open({
      title: MODAL_TITLE.DELETE,
      content: MODAL_CONTENT.DELETE,
      accept: {
        text: MODAL_ACCEPT.DELETE,
        onClick: () => commentDeleteMutate(id),
      },
    });
  };

  const handleReportClick = (id: number) => {
    return open({
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
  };

  return (
    <div
      className={cn('my-5 flex sm:my-2', {
        'border-l pl-5 last:border-l-white': isReply,
      })}
    >
      <Avatar src={writerImageUrl} roleLevel={writerRoleLevel} />
      <div className="ml-3 flex w-full flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <p className="font-semibold">
            {formatMemberName(writerName, writerId)}
          </p>
          <ReactionButton
            className="flex items-center space-x-2"
            countNumber={likes}
            onClick={() => commentLikesMutate(id)}
            disabled={isPending}
          >
            <ThumbUpOutline />
          </ReactionButton>
        </div>
        {isDeleted ? (
          <p className="text-red-500">삭제된 댓글입니다.</p>
        ) : (
          <p className="whitespace-pre-wrap">
            {toDecodeHTMLEntities(children)}
          </p>
        )}
        <div className="flex justify-end gap-4">
          <p className="text-gray-500">
            {formattedDate(toKoreaISOString(createdAt))}
          </p>

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
