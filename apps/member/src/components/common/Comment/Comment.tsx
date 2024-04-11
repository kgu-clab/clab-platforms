import classNames from 'classnames';
import Image from '../Image/Image';
import { formattedDate } from '@utils/date';
import { getProfileRingStyle } from '@utils/style';
import { createImageUrl } from '@utils/api';

interface CommentProps {
  writerId: string | null;
  writerName: string;
  writerRoleLevel: number | null;
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
        'last:border-l-white border-l pl-5': isReply,
      })}
    >
      <Image
        width="w-10"
        height="h-10"
        src={createImageUrl(writerImageUrl)}
        alt={writerName}
        className={classNames(
          'rounded-full ring ring-offset-1',
          getProfileRingStyle(writerRoleLevel),
        )}
      />
      <div className="w-full ml-3 text-sm">
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
