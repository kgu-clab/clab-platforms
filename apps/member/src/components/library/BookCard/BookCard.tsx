import Image from '@components/common/Image/Image';
import { BOOK_STATE } from '@constants/state';
import classNames from 'classnames';
import type { BookItem } from '@type/book';
import { useNavigate } from 'react-router-dom';
import { PATH_FINDER } from '@constants/path';

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
      className="flex flex-col group space-y-1 border rounded-lg cursor-pointer"
      onClick={() => navigate(PATH_FINDER.LIBRARY_DETAIL(id))}
    >
      <Image
        src={imageUrl}
        alt={title}
        width="w-full"
        height="h-[200px]"
        className="object-cover border-b rounded-t-lg group-hover:scale-125 transition-transform ease-in-out"
        overflow
      />
      <div className="flex flex-col grow justify-between text-sm p-2">
        <div>
          <p className="font-semibold group-hover:underline">{title}</p>
          <p className="text-gray-500">
            {author} | {publisher}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <span
            className={classNames(
              'w-1.5 h-1.5 rounded-full',
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
