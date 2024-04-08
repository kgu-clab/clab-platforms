import { cn } from '@utils/string';
import { MdOutlineNavigateNext } from 'react-icons/md';
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

  const pageNumber = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  for (let i = startPage; i <= endPage; i++) {
    pageNumber.push(i);
  }

  const handleCurrentPageClick = (page: number) => {
    onChange(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className={cn('flex items-center space-x-4', className)}>
      <button
        onClick={() => handleCurrentPageClick(-postLimit)}
        className="px-1 text-gray-500 border rounded"
      >
        <MdOutlineNavigateNext size={20} className="rotate-180" />
      </button>
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
      <button
        onClick={() => handleCurrentPageClick(Math.ceil(+postLimit))}
        className="px-0.5 text-gray-500 border rounded"
      >
        <MdOutlineNavigateNext size={20} />
      </button>
    </div>
  );
};

export default Pagination;
