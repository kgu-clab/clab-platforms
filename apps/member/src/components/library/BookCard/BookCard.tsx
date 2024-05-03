import { useNavigate } from 'react-router-dom';

import Image from '@components/common/Image/Image';

import { PATH_FINDER } from '@constants/path';
import { BOOK_STATE } from '@constants/state';
import { cn } from '@utils/string';

import type { BookItem } from '@type/book';

interface BookCardProps extends BookItem {}

const BookCard = ({
  id,
  imageUrl,
  title,
  author,
  publisher,
  borrowerId,
}: BookCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="group flex cursor-pointer flex-col space-y-1 overflow-hidden rounded-lg border"
      onClick={() => navigate(PATH_FINDER.LIBRARY_DETAIL(id))}
    >
      <Image
        src={imageUrl}
        alt={title}
        height="h-[200px]"
        className="border-b object-cover transition-transform ease-in-out group-hover:scale-110"
        overflow
      />
      <div className="flex grow flex-col justify-between p-2 text-sm">
        <div className="break-keep">
          <p className="line-clamp-2 font-semibold group-hover:underline">
            {title}
          </p>
          <div className="text-gray-500">
            <p className="line-clamp-1">{author}</p>
            <p className="line-clamp-1">{publisher}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <span
            className={cn(
              'size-1.5 rounded-full',
              borrowerId ? 'bg-pink-600' : 'bg-green-600',
            )}
          />
          <span
            className={cn(
              'text-xs',
              borrowerId ? 'text-pink-600' : 'text-green-600',
            )}
          >
            {borrowerId ? BOOK_STATE.BORROWED : BOOK_STATE.AVAILABLE}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
