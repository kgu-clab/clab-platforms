import { cn } from '@utils/string';
import ArrowButton from '../ArrowButton/ArrowButton';
import type { PaginationOnChange } from '@type/component';

interface PaginationProps {
  page: number;
  postLimit: number;
  totalItems: number;
  onChange: PaginationOnChange;
  className?: string;
}

const Pagination = ({
  page,
  postLimit,
  totalItems,
  onChange,
  className,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / postLimit);

  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages, startPage + 4);
  const pageNumber = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const handleCurrentPageClick = (page: number) => {
    onChange(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className={cn('flex items-center space-x-4', className)}>
      <ArrowButton onClick={() => handleCurrentPageClick(-postLimit)} />
      {pageNumber.length === 0 ? (
        <span>1</span>
      ) : (
        pageNumber.map((index) => (
          <button
            key={index}
            className={cn('underline-offset-4 text-gray-500', {
              'underline text-clab-main': page + 1 === index,
            })}
            onClick={() => handleCurrentPageClick(index)}
          >
            {index}
          </button>
        ))
      )}
      <ArrowButton
        direction="next"
        onClick={() => handleCurrentPageClick(+postLimit)}
      />
    </div>
  );
};

export default Pagination;
