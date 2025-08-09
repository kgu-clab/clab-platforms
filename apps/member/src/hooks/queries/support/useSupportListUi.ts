import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import type { Support } from '@type/support';

interface UseSupportListUIProps {
  sortedData: Support[];
  supportData: Support[];
  page: number;
  size: number;
  handlePageChange: (p: number) => void;
  showAll: boolean;
}

export const useSupportListUI = ({
  sortedData,
  supportData,
  page,
  size,
  handlePageChange,
  showAll,
}: UseSupportListUIProps) => {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('selected');

  const [currentOpenItemIndex, setCurrentOpenItemIndex] = useState(-1);

  const handleTableItemClick = (id: number) => {
    setCurrentOpenItemIndex(id);
  };

  useEffect(() => {
    setCurrentOpenItemIndex(-1);

    if (!selectedId || !showAll) return;
    const targetId = Number(selectedId);

    const existsInSupportData = supportData.some(
      (item) => item.id === targetId,
    );

    if (!existsInSupportData) return;
    const targetIndex = sortedData.findIndex((item) => item.id === targetId);

    if (targetIndex === -1) return;
    const targetPage = Math.floor(targetIndex / size) + 1;

    if (targetPage !== page) {
      handlePageChange(targetPage);
    } else {
      setCurrentOpenItemIndex(targetId);
    }
  }, [
    selectedId,
    showAll,
    supportData,
    sortedData,
    size,
    page,
    handlePageChange,
  ]);

  return {
    currentOpenItemIndex,
    handleTableItemClick,
  };
};
