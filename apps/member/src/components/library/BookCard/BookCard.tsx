import { useNavigate } from 'react-router-dom';

import Image from '@components/common/Image/Image';

import { PATH_FINDER } from '@constants/path';
import { BOOK_STATE } from '@constants/state';
import classNames from 'classnames';

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
        width="w-full"
        height="h-[200px]"
        className="border-b object-cover transition-transform ease-in-out group-hover:scale-110"
        overflow
      />
      <div className="flex grow flex-col justify-between p-2 text-sm">
        <div>
          <p className="font-semibold group-hover:underline">{title}</p>
          <p className="text-gray-500">
            {author} | {publisher}
          </p>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <span
            className={classNames(
              'h-1.5 w-1.5 rounded-full',
              borrowerId ? 'bg-green-600' : 'bg-pink-600',
            )}
          />
          <span
            className={classNames(
              'text-xs',
              borrowerId ? 'text-green-600' : 'text-pink-600',
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
