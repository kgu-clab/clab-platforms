import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { Button, Table } from '@clab-platforms/design-system';

import MoreButton from '@components/common/MoreButton/MoreButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { usePagination } from '@hooks/common/usePagination';
import { useSupportList } from '@hooks/queries';

import SupportTableRow from './SupportTableRow';

interface SupportListSectionProps {
  showAll?: boolean;
}

const SupportListSection = ({ showAll = false }: SupportListSectionProps) => {
  const { page, size, handlePageChange } = usePagination({
    defaultSize: showAll ? 10 : 5,
    sectionName: 'support',
  });

  const {
    data: pagedSupportData,
    isLoading,
    error,
  } = useSupportList({
    page: showAll ? page : 0,
    size: showAll ? size : 5,
  });

  const { data: allSupportData } = useSupportList({ page: 0, size: 999 });
  const allSupportItems = allSupportData?.items ?? [];

  const supportItems = pagedSupportData.items;
  const [searchParams] = useSearchParams();
  const selectedSupportId = searchParams.get('selected');
  const [openedSupportId, setOpenedSupportId] = useState(-1);

  const handleTableRowClick = (id: number) => {
    setOpenedSupportId(id);
  };

  useEffect(() => {
    if (!selectedSupportId || !showAll) return;

    const targetId = Number(selectedSupportId);
    const targetIndex = allSupportItems.findIndex(
      (item) => item.id === targetId,
    );
    const targetPage = Math.floor(targetIndex / size) + 1;

    if (targetPage !== page) {
      handlePageChange(targetPage);
    }

    setOpenedSupportId(targetId);
  }, [
    selectedSupportId,
    showAll,
    allSupportItems,
    size,
    page,
    handlePageChange,
  ]);

  if (error) {
    return (
      <Section>
        <Section.Header title={showAll ? ' ' : '최근 문의'} />
        <Section.Body>
          <div className="py-8 text-center text-red-500">
            문의 목록을 불러오는데 실패했어요. <br />
            <Button
              onClick={() => window.location.reload()}
              className="mt-2 underline"
              color="blue"
            >
              다시 시도
            </Button>
          </div>
        </Section.Body>
      </Section>
    );
  }

  if (isLoading) {
    return (
      <Section>
        <Section.Header title={showAll ? ' ' : '최근 문의'} />
        <Section.Body>
          <div className="py-8 text-center">
            <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-blue-600" />
            <p className="mt-2 text-gray-500">로딩 중...</p>
          </div>
        </Section.Body>
      </Section>
    );
  }

  return (
    <Section>
      <Section.Header title={showAll ? ' ' : '최근 문의'}>
        {!showAll && <MoreButton to="./list">더보기</MoreButton>}
      </Section.Header>
      <Section.Body>
        <div className="w-full overflow-x-auto">
          <Table head={TABLE_HEAD.SUPPORT_TABLE} className="w-full table-fixed">
            {supportItems.length > 0 ? (
              supportItems.map((item) => (
                <SupportTableRow
                  key={item.id}
                  data={item}
                  showAll={showAll}
                  currentOpenItemIndex={openedSupportId}
                  onClick={handleTableRowClick}
                />
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={5} className="text-center text-gray-500">
                  <span>문의가 없어요.</span>
                </Table.Cell>
              </Table.Row>
            )}
          </Table>

          {showAll &&
            pagedSupportData?.totalItems &&
            pagedSupportData.totalItems > size && (
              <Pagination
                className="mt-4 justify-center"
                totalItems={pagedSupportData.totalItems}
                postLimit={size}
                onChange={handlePageChange}
                page={page}
              />
            )}
        </div>
      </Section.Body>
    </Section>
  );
};

export default SupportListSection;
