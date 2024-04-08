import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 페이지네이션을 위한 페이지 조작 훅입니다.
 */
export const usePagination = (defaultSize: number = 20) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [pagination, setPagination] = useState({
    page: parseInt(searchParams.get('page') ?? '1') - 1,
    size: defaultSize,
  });

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (page: number) => {
      navigate(`?page=${page}`, { replace: false });
    },
    [navigate],
  );

  useEffect(() => {
    const page = parseInt(searchParams.get('page') ?? '1', 10) - 1;
    setPagination((prev) => ({ ...prev, page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return { page: pagination.page, size: pagination.size, handlePageChange };
};
