import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { Menubar, Table } from '@clab-platforms/design-system';
import { toDecodeHTMLEntities } from '@clab-platforms/utils';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';
import CommunityBoardForm from '@components/community/CommunityBoardForm/CommunityBoardForm';

import { SERVICE_NAME } from '@constants/environment';
import { TABLE_HEAD, TABLE_HEAD_ACTION } from '@constants/head';
import { PATH_FINDER } from '@constants/path';
import { usePagination } from '@hooks/common/usePagination';
import { useView } from '@hooks/common/useView';
import { useDeleteModal } from '@hooks/modal/useDeleteModal';
import { useBoardByCategory, useBoardDeleteMutation } from '@hooks/queries';
import { getCategoryTitle } from '@utils/community';
import { toYYMMDD } from '@utils/date';

import type { CommunityCategoryType } from '@type/community';

type ModeState = 'view' | 'add';

interface Props {
  category: CommunityCategoryType;
}

export function AlertSection({ category }: Props) {
  const navigate = useNavigate();
  const { open } = useDeleteModal();
  const { boardDeleteMutate } = useBoardDeleteMutation();
  const { data } = useBoardByCategory({
    hasPermission: true,
    category: category,
  });

  const { view, handleViewClick } = useView<ModeState>('view');
  const { page, size, handlePageChange } = usePagination({
    sectionName: category,
  });

  const title = getCategoryTitle(category);

  const handleTableRowClick = useCallback(
    (id: number) => {
      navigate(PATH_FINDER.COMMUNITY_POST(category, id));
    },
    [category, navigate],
  );

  const handleDeleteButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      e.stopPropagation();
      return open({
        title: title,
        onClick: () => boardDeleteMutate(id),
      });
    },
    [boardDeleteMutate, open, title],
  );

  const renderView = useMemo(
    () =>
      ({
        view: (
          <Table head={[...TABLE_HEAD.COMMUNITY_DETAIL, TABLE_HEAD_ACTION]}>
            {data.items.map(
              ({ id, title, writerId, writerName, createdAt }) => (
                <Table.Row
                  key={id}
                  className="text-nowrap text-center"
                  onClick={() => handleTableRowClick(id)}
                >
                  <Table.Cell>{id}</Table.Cell>
                  <Table.Cell className="w-full truncate text-left">
                    {toDecodeHTMLEntities(title)}
                  </Table.Cell>
                  <Table.Cell>
                    {writerId ? `${writerName} (${writerId})` : SERVICE_NAME}
                  </Table.Cell>
                  <Table.Cell>{toYYMMDD(createdAt)}</Table.Cell>
                  <Table.Cell className="space-x-2">
                    <ActionButton
                      color="red"
                      onClick={(e) => handleDeleteButtonClick(e, id)}
                    >
                      삭제
                    </ActionButton>
                  </Table.Cell>
                </Table.Row>
              ),
            )}
          </Table>
        ),
        add: <CommunityBoardForm category={category} />,
      })[view],
    [data.items, category, view, handleTableRowClick, handleDeleteButtonClick],
  );

  return (
    <Section>
      <Section.Header
        title={title}
        description={`${title}을 추가하거나 삭제할 수 있어요`}
      >
        <Menubar>
          <Menubar.Item
            selected={view === 'view'}
            onClick={() => handleViewClick('view')}
          >
            보기
          </Menubar.Item>
          <Menubar.Item
            selected={view === 'add'}
            onClick={() => handleViewClick('add')}
          >
            추가
          </Menubar.Item>
        </Menubar>
      </Section.Header>
      <Section.Body>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">{renderView}</div>
        </div>
        {view === 'view' && (
          <Pagination
            className="mt-4 justify-center"
            totalItems={data.totalItems}
            postLimit={size}
            onChange={handlePageChange}
            page={page}
          />
        )}
      </Section.Body>
    </Section>
  );
}
