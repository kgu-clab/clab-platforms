import SkeletonImage from '@components/common/Skeleton/SkeletonImage';
import { PATH_FINDER } from '@constants/path';
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
  category: string;
}

const LibraryBookList = ({ data, category }: LibraryBookListProps) => {
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
          className="space-y-1 border rounded-lg cursor-pointer"
          onClick={() => onClickBook(id)}
        >
          <SkeletonImage
            className="h-[200px] w-full object-cover border-b"
            src={image}
            alt="도서 이미지"
            h={200}
            w={200}
          />

          <div className="text-sm p-2">
            <p className="hover:underline font-bold">{title}</p>
            <p className="text-gray-500">
              {author} | {publisher}
            </p>
            {category === '소장도서' && (
              <p
                className={
                  state === '대여 가능' ? 'text-green-600' : 'text-pink-600'
                }
              >
                {state}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default LibraryBookList;
