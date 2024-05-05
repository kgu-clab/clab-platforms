import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Menubar, MenubarItem, Table } from '@clab/design-system';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';
import AddBoardForm from '@components/community/AddBoardForm/AddBoardForm';

import { SERVICE_NAME } from '@constants/environment';
import { TABLE_HEAD, TABLE_HEAD_ACTION } from '@constants/head';
import { PATH_FINDER } from '@constants/path';
import useModal from '@hooks/common/useModal';
import { usePagination } from '@hooks/common/usePagination';
import { useBoardDeleteMutation, useCategoryBoards } from '@hooks/queries';
import { categoryToTitle } from '@utils/community';
import { toYYMMDD } from '@utils/date';
import { toDecodeHTMLEntities } from '@utils/string';

import type { CommunityCategoryType } from '@type/community';

interface ManagerAlertSectionProps {
  category: CommunityCategoryType;
}

type Mode = 'view' | 'add';

const ManagerAlertSection = ({ category }: ManagerAlertSectionProps) => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { boardDeleteMutate } = useBoardDeleteMutation();
  const { data } = useCategoryBoards({ category: category });

  const [mode, setMode] = useState<Mode>('view');
  const { page, size, handlePageChange } = usePagination();

  const title = categoryToTitle(category);

  const handleTableRowClick = useCallback(
    (id: number) => {
      navigate(PATH_FINDER.COMMUNITY_POST(category, id));
    },
    [category, navigate],
  );

  const handleMenubarItemClick = useCallback((mode: Mode) => {
    setMode(mode);
  }, []);

  const handleDeleteButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      e.stopPropagation();
      return openModal({
        title: `${title} 삭제`,
        content: `해당 ${title}을 정말 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.`,
        accept: {
          text: '삭제',
          onClick: () => boardDeleteMutate(id),
        },
      });
    },
    [boardDeleteMutate, openModal, title],
  );

  const renderView = {
    view: (
      <Table head={[...TABLE_HEAD.COMMUNITY_DETAIL, TABLE_HEAD_ACTION]}>
        {data.items.map(({ id, title, writerId, writerName, createdAt }) => (
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
        ))}
      </Table>
    ),
    add: <AddBoardForm category={category} />,
  }[mode];

  return (
    <Section>
      <Section.Header
        title={title}
        description={`${title}을 추가하거나 삭제할 수 있어요`}
      >
        <Menubar>
          <MenubarItem
            selected={mode === 'view'}
            onClick={() => handleMenubarItemClick('view')}
          >
            보기
          </MenubarItem>
          <MenubarItem
            selected={mode === 'add'}
            onClick={() => handleMenubarItemClick('add')}
          >
            추가
          </MenubarItem>
        </Menubar>
      </Section.Header>
      <Section.Body>
        {renderView}
        {mode === 'view' && (
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
};

export default ManagerAlertSection;
