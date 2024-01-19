import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { MdOutlineSkipNext } from 'react-icons/md';

interface PaginationProps {
  className?: string;
  totalItems: number;
  pageLimit: number;
  postLimit: number;
  setPage: (page: number) => void;
  page: number;
  sort?: string;
}

const Pagination = ({
  className,
  totalItems,
  pageLimit,
  postLimit,
  setPage,
  page,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / postLimit);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(Math.min(pageLimit, totalPages));
  const [clickedButton, setClickedButton] = useState(1);

  const pageNumber = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumber.push(i);
  }

  const handleButtonClick = (index: number) => {
    setPage(index);
    setClickedButton(index);
  };

  useEffect(() => {
    setStartPage(page - (page % 5) + 1);
    setEndPage(Math.min(totalPages, page - (page % 5) + 5));
  }, [page, totalPages, pageLimit]);

  return (
    <div className={classNames('flex items-center', className)}>
      <button onClick={() => handleButtonClick(1)}>
        <MdOutlineSkipNext className="rotate-180" />
      </button>
      {pageNumber.map((index) => (
        <div key={index}>
          <button
            className={classNames('rounded-full px-2', {
              underline: clickedButton === index,
            })}
            onClick={() => handleButtonClick(index)}
          >
            {index}
          </button>
        </div>
      ))}
      <button onClick={() => handleButtonClick(totalPages)}>
        <MdOutlineSkipNext />
      </button>
    </div>
  );
};

export default Pagination;
