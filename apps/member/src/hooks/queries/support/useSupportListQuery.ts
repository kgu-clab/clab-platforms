import { usePagination } from '@hooks/common/usePagination';
import { useSupportList } from '@hooks/queries';

export const useSupportListQuery = (showAll: boolean) => {
  const { page, size, handlePageChange } = usePagination({
    defaultSize: showAll ? 10 : 5,
    sectionName: 'support',
  });

  const { data, isLoading, error } = useSupportList({
    page: showAll ? page : 0,
    size: showAll ? size : 10,
  });

  const supportData = data.items;

  const sortedData = [...supportData].sort((a, b) => b.id - a.id);

  const displayData = showAll ? sortedData : sortedData.slice(0, 5);

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
