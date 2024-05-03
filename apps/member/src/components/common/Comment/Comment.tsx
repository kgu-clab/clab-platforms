import { formattedDate } from '@utils/date';
import classNames from 'classnames';

import type { RoleLevel } from '@type/member';

import Avatar from '../Avatar/Avatar';

interface CommentProps {
  writerId: string | null;
  writerName: string;
  writerRoleLevel: RoleLevel;
  writerImageUrl: string | null;
  createdAt: string;
  children: React.ReactNode;
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
      className={classNames('flex', {
        'border-l pl-5 last:border-l-white': isReply,
      })}
    >
      <Avatar src={writerImageUrl} roleLevel={writerRoleLevel} />
      <div className="ml-3 w-full text-sm">
        <p className="font-semibold">{`${writerName} ${writerId ? `(${writerId})` : ''}`}</p>
        <p className="whitespace-pre-wrap">{children}</p>
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
