import { useMemo } from 'react';

import { usePagination } from '@hooks/common/usePagination';

import { useSupports } from './useSupports';

export const useSupportListQuery = (showAll: boolean) => {
  const { page, size, handlePageChange } = usePagination({
    defaultSize: showAll ? 10 : 5,
    sectionName: 'support',
  });

  const { data, isLoading, error } = useSupports({
    page: showAll ? page : 0,
    size: showAll ? size : 10,
  });

  const supportData = useMemo(() => data?.items ?? [], [data]);

  const sortedData = useMemo(() => {
    return [...supportData].sort((a, b) => b.id - a.id);
  }, [supportData]);

  const displayData = useMemo(() => {
    return showAll ? sortedData : sortedData.slice(0, 5);
  }, [sortedData, showAll]);

  return {
    data,
    isLoading,
    error,
    displayData,
    page,
    size,
    handlePageChange,
  };
};
