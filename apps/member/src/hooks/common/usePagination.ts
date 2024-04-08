import { useCallback, useState } from 'react';
import type { PaginationOnChange } from '@type/common';

/**
 * 페이지네이션을 위한 페이지 조작 훅입니다.
 */
export const usePagination = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
  });

  const handlePageChange: PaginationOnChange = useCallback(
    (page: number) => {
      setPagination({ ...pagination, page: page - 1 });
    },
    [pagination],
  );

  return { page: pagination.page, size: pagination.size, handlePageChange };
};
