import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';

import { usePagination } from '@hooks/common/usePagination';
import { useBooks } from '@hooks/queries/book';

import BookCard from '../BookCard/BookCard';

const LibraryBooksSection = () => {
  const { page, size, handlePageChange } = usePagination(16);

  const { data } = useBooks(page, size);

  return (
    <Section>
      <Section.Header
        title="둘러보기"
        description="소장 도서를 둘러볼 수 있어요"
      />
      <Section.Body>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.items.map(({ id, ...rest }) => (
            <BookCard key={id} id={id} {...rest} />
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
};
export default LibraryBooksSection;
