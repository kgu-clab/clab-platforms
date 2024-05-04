import { formattedDate } from '@utils/date';
import { cn, formatMemberName, toDecodeHTMLEntities } from '@utils/string';

import type { CommentListItem } from '@type/comment';

import Avatar from '../Avatar/Avatar';

interface CommentProps
  extends Omit<CommentListItem, 'id' | 'content' | 'children'> {
  children: string;
  onClickReport: () => void;
  onClickReply: () => void;
  isReply?: boolean;
}

const Comment = ({
  writerId,
  writerName,
  writerRoleLevel,
  writerImageUrl,
  createdAt,
  children,
  onClickReport,
  onClickReply,
  isReply,
}: CommentProps) => {
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
        <p className="whitespace-pre-wrap">{toDecodeHTMLEntities(children)}</p>
        <div className="flex justify-end gap-4">
          <p className="text-gray-500">{formattedDate(createdAt)}</p>
          <button onClick={onClickReport}>신고</button>
          {!isReply && <button onClick={onClickReply}>답글 쓰기</button>}
        </div>
      </div>
    </div>
  );
};

export default Comment;
