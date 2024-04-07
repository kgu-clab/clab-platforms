import classNames from 'classnames';
import Image from '../Image/Image';
import { formattedDate } from '@utils/date';
import { getProfileRingStyle } from '@utils/style';
import { createImageUrl } from '@utils/api';

interface CommentProps {
  isReply?: boolean;
  writer: string;
  writerRoleLevel: number;
  writerImageUrl: string;
  createdAt: string;
  children: React.ReactNode;
  onClickReport: () => void;
  onClickReply: () => void;
}

const Comment = ({
  isReply = false,
  writer,
  writerRoleLevel,
  writerImageUrl,
  createdAt,
  children,
  onClickReport,
  onClickReply,
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
        alt={writer}
        className={classNames(
          'rounded-full ring ring-offset-1',
          getProfileRingStyle(writerRoleLevel),
        )}
      />
      <div className="w-full ml-2">
        <p className="text-sm font-semibold">{writer}</p>
        <p className="py-2 text-sm whitespace-pre-wrap">{children}</p>
        <div className="flex justify-end gap-4 text-sm">
          <p className="text-gray-500">{formattedDate(createdAt)}</p>
          <button onClick={onClickReport}>신고</button>
          {!isReply && <button onClick={onClickReply}>답글 쓰기</button>}
        </div>
      </div>
    </div>
  );
};

export default Comment;
