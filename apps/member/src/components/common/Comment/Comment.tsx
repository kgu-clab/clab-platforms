import classNames from 'classnames';
import Image from '../Image/Image';
import { formattedDate } from '@utils/date';

interface CommentProps {
  isReply?: boolean;
  writer: string;
  image: string;
  children: React.ReactNode;
  onClickReport: () => void;
  onClickReply: () => void;
}

const Comment = ({
  isReply = false,
  writer,
  image,
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
        className="rounded-full"
        width="w-10"
        height="h-10"
        src={image}
        alt="프로필사진"
      />
      <div className="w-full ml-2">
        <p className="text-sm font-semibold">{writer}</p>
        <p className="py-2 text-sm whitespace-pre-wrap">{children}</p>
        <div className="flex justify-end gap-4 text-sm">
          <p className="text-gray-500">{formattedDate('2021-11-22')}</p>
          <button onClick={onClickReport}>신고</button>
          {!isReply && <button onClick={onClickReply}>답글 쓰기</button>}
        </div>
      </div>
    </div>
  );
};

export default Comment;
