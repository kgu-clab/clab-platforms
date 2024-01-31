import Image from '@components/common/Image/Image';
import { PATH_FINDER } from '@constants/path';
import { BOOK_STATE } from '@constants/state';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

interface LibraryBookListProps {
  data: {
    id: number;
    title: string;
    image: string;
    author: string;
    publisher: string;
    state: string;
  }[];
}

const LibraryBookList = ({ data }: LibraryBookListProps) => {
  const navigate = useNavigate();

  const onClickBook = (id: number) => {
    navigate(PATH_FINDER.LIBRARY_DETAIL(id), {
      state: { id: id },
    });
  };

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map(({ id, image, title, author, publisher, state }) => (
        <div
          key={id}
          className="group space-y-1 border rounded-lg cursor-pointer"
          onClick={() => onClickBook(id)}
        >
          <Image
            src={image}
            alt={title}
            width="w-full"
            height="h-[200px]"
            className="object-cover border-b rounded-t-lg group-hover:scale-125 transition-transform ease-in-out"
            overflow
          />
          <div className="text-sm p-2">
            <p className="font-semibold group-hover:underline">{title}</p>
            <p className="text-gray-500">
              {author} | {publisher}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <div
                className={classNames(
                  'w-1.5 h-1.5 rounded-full',
                  state === BOOK_STATE.OK ? 'bg-green-600' : 'bg-pink-600',
                )}
              ></div>
              <span
                className={classNames(
                  'text-xs',
                  state === BOOK_STATE.OK ? 'text-green-600' : 'text-pink-600',
                )}
              >
                {state}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default LibraryBookList;
