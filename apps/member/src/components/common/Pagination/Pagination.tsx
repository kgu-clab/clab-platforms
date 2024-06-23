import { cn } from '@clab/utils';

import type { PaginationOnChange } from '@type/component';

import ArrowButton from '../ArrowButton/ArrowButton';

interface Props {
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
}: Props) => {
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
            className={cn('text-gray-500 underline-offset-4', {
              'text-clab-main underline': page + 1 === index,
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
