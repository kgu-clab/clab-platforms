import { Button, Table } from '@clab-platforms/design-system';

import MoreButton from '@components/common/MoreButton/MoreButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { useSupportListQuery } from '@hooks/queries/support/useSupportListQuery';
import { useSupportListUI } from '@hooks/queries/support/useSupportListUi';

import SupportTableRow from './SupportTableRow';

interface SupportListSectionProps {
  showAll?: boolean;
}

const SupportListSection = ({ showAll = false }: SupportListSectionProps) => {
  const { data, isLoading, error, displayData, page, size, handlePageChange } =
    useSupportListQuery(showAll);

  const { currentOpenItemIndex, handleTableItemClick } = useSupportListUI({
    sortedData: displayData,
    supportData: data?.items ?? [],
    page,
    size,
    handlePageChange,
    showAll,
  });

  if (error) {
    return (
      <Section>
        <Section.Header title={showAll ? ' ' : '최근 문의'} />
        <Section.Body>
          <div className="py-8 text-center text-red-500">
            문의 목록을 불러오는데 실패했어요.
            <br />
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
            {displayData.length > 0 ? (
              displayData.map((data) => (
                <SupportTableRow
                  data={data}
                  key={data.id}
                  showAll={showAll}
                  currentOpenItemIndex={currentOpenItemIndex}
                  onClick={handleTableItemClick}
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

          {/* showAll일 때만 페이지네이션 표시 */}
          {showAll && data?.totalItems && data.totalItems > size && (
            <Pagination
              className="mt-4 justify-center"
              totalItems={data.totalItems}
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
