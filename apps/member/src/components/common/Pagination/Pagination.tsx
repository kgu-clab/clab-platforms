import { useEffect, useState } from 'react';
import { cn } from '@utils/string';
import { MdOutlineNavigateNext } from 'react-icons/md';
import type { PaginationOnChange } from '@type/common';

interface PaginationProps {
  page: number;
  postLimit: number;
  totalItems: number;
  onChange?: PaginationOnChange;
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
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(totalPages);
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumber = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumber.push(i);
  }

  const handleCurrentPageClick = (index: number) => {
    const changePage = Math.max(1, Math.min(index, totalPages));
    onChange && onChange(changePage);
    setCurrentPage(changePage);
  };

  useEffect(() => {
    setStartPage(page - (page % 5) + 1);
    setEndPage(Math.min(totalPages, page - (page % 5) + 5));
  }, [page, totalPages]);

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
        pageNumber.map((page) => (
          <button
            key={page}
            className={cn('underline-offset-4 text-gray-500', {
              'underline text-clab-main': currentPage === page,
            })}
            onClick={() => handleCurrentPageClick(page)}
          >
            {page}
          </button>
        ))
      )}
      <button
        onClick={() => handleCurrentPageClick(Math.ceil(+postLimit))}
        className="px-1 text-gray-500 border rounded"
      >
        <MdOutlineNavigateNext size={20} />
      </button>
    </div>
  );
};

export default Pagination;
