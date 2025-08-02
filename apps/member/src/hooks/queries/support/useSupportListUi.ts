import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { Support } from '@type/support';

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

  const handleTableItemClick = useCallback((id: number) => {
    setCurrentOpenItemIndex(id);
  }, []);

  useEffect(() => {
    setCurrentOpenItemIndex(-1);

    if (selectedId && showAll) {
      const targetId = parseInt(selectedId);
      const targetSupport = supportData.find((item) => item.id === targetId);

      if (targetSupport) {
        const targetIndex = sortedData.findIndex(
          (item) => item.id === targetId,
        );
        const targetPage = Math.floor(targetIndex / size) + 1;

        if (targetPage !== page) {
          handlePageChange(targetPage);
        } else {
          setCurrentOpenItemIndex(targetId);
        }
      }
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
