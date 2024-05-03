import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 페이지네이션을 위한 페이지 조작 훅입니다.
 * Pagination Component와 같이 사용합니다.
 */
export const usePagination = (defaultSize: number = 20) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPage = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get('page') ?? '1', 10) - 1;
  }, [location.search]);

  const [pagination, setPagination] = useState({
    page: getPage(),
    size: defaultSize,
  });

  const handlePageChange = useCallback(
    (page: number) => {
      navigate('?page=' + page);
    },
    [navigate],
  );

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: getPage() }));
  }, [getPage]);

  return { ...pagination, handlePageChange };
};
