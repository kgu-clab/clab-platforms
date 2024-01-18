import { useEffect, useState } from 'react';

interface PaginationProps {
  totalItems: number;
  pageLimit: number;
  postLimit: number;
  setPage: (page: number) => void;
  page: number;
  sort?: string;
}

const Pagination = ({
  totalItems,
  pageLimit,
  postLimit,
  setPage,
  page,
  sort,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / postLimit);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(Math.min(pageLimit, totalPages));
  const [clickedButton, setClickedButton] = useState(1);

  const pageNumber = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    setStartPage(page - (page % 5) + 1);
    setEndPage(Math.min(totalPages, page - (page % 5) + 5));
  }, [page, totalPages, pageLimit]);

  useEffect(() => {
    setPage(1);
  }, [sort]);

  const handleButtonClick = (index: number) => {
    setPage(index);
    setClickedButton(index);
  };

  return (
    <div className="flex">
      <button
        className="rounded-full px-2 hover:bg-gray-200"
        onClick={() => handleButtonClick(1)}
      >
        {'<<'}
      </button>

      {pageNumber.map((index) => (
        <div key={index}>
          <button
            className={`rounded-full px-2 hover:bg-gray-300 ${
              clickedButton === index ? 'bg-gray-200' : null
            }`}
            onClick={() => handleButtonClick(index)}
          >
            {index}
          </button>
        </div>
      ))}

      <button
        className="rounded-full px-2 hover:bg-gray-200"
        onClick={() => handleButtonClick(totalPages)}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
