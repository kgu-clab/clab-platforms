import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { createQueryParams } from '@utils/string';

/**
 * 페이지네이션을 위한 페이지 조작 훅입니다.
 * Pagination Component와 같이 사용합니다.
 */
interface UsePaginationProps {
  defaultSize?: number;
  sectionName?: string;
}

export const usePagination = ({
  defaultSize = 20,
  sectionName = 'page',
}: UsePaginationProps = {}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPage = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get(sectionName) ?? '1', 10) - 1;
  }, [location.search, sectionName]);

  const [pagination, setPagination] = useState({
    page: getPage(),
    size: defaultSize,
  });

  const handlePageChange = useCallback(
    (page: number) => {
      const queryParams = createQueryParams(sectionName, page);
      navigate(queryParams);
    },
    [navigate, sectionName],
  );

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: getPage() }));
  }, [getPage]);

  return { ...pagination, handlePageChange };
};
