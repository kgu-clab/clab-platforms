import { Link } from 'react-router-dom';

import { cn } from '@clab-platforms/utils';

import Image from '@components/common/Image/Image';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';

import { PATH_FINDER } from '@constants/path';
import { BOOK_STATE } from '@constants/state';
import { usePagination } from '@hooks/common/usePagination';

import type { BookItem } from '@type/book';

import { useBooks } from '../hooks/useBooks';

export default function BookExplorerSection() {
  const { page, size, handlePageChange } = usePagination({ defaultSize: 16 });

  const { data } = useBooks({ page, size });

  return (
    <Section>
      <Section.Header
        title="둘러보기"
        description="소장 도서를 둘러볼 수 있어요"
      />
      <Section.Body>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.items.map(({ id, ...props }) => (
            <BookCard key={id} id={id} {...props} />
          ))}
        </div>
        <Pagination
          className="mt-4 justify-center"
          totalItems={data.totalItems}
          postLimit={size}
          onChange={handlePageChange}
          page={page}
        />
      </Section.Body>
    </Section>
  );
}

interface BookCardProps extends BookItem {}

const BookCard = ({
  id,
  imageUrl,
  title,
  author,
  publisher,
  borrowerId,
}: BookCardProps) => {
  return (
    <Link
      to={PATH_FINDER.LIBRARY_DETAIL(id)}
      className="group flex cursor-pointer flex-col space-y-1 overflow-hidden rounded-lg border"
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
    </Link>
  );
};
