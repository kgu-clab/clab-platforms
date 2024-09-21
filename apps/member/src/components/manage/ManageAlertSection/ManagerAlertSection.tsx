import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Menubar, Table } from '@clab-platforms/design-system';
import { toDecodeHTMLEntities } from '@clab-platforms/utils';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';
import CommunityBoardForm from '@components/community/CommunityBoardForm/CommunityBoardForm';

import { SERVICE_NAME } from '@constants/environment';
import { TABLE_HEAD, TABLE_HEAD_ACTION } from '@constants/head';
import { PATH_FINDER } from '@constants/path';
import { useModal } from '@hooks/common/useModal';
import { usePagination } from '@hooks/common/usePagination';
import { useBoardByCategory, useBoardDeleteMutation } from '@hooks/queries';
import { getCategoryTitle } from '@utils/community';
import { toYYMMDD } from '@utils/date';

import type { CommunityCategoryType } from '@type/community';

interface ManagerAlertSectionProps {
  category: CommunityCategoryType;
}

type ModeState = 'view' | 'add';

const ManagerAlertSection = ({ category }: ManagerAlertSectionProps) => {
  const navigate = useNavigate();
  const { open } = useModal();
  const { boardDeleteMutate } = useBoardDeleteMutation();
  const { data } = useBoardByCategory({
    hasPermission: true,
    category: category,
  });

  const [mode, setMode] = useState<ModeState>('view');
  const { page, size, handlePageChange } = usePagination({
    sectionName: category,
  });

  const title = getCategoryTitle(category);

  const handleTableRowClick = (id: number) => {
    navigate(PATH_FINDER.COMMUNITY_POST(category, id));
  };

  const handleMenubarItemClick = (mode: ModeState) => setMode(mode);

  const handleDeleteButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => {
    e.stopPropagation();
    return open({
      title: `${title} 삭제`,
      content: `해당 ${title}을 정말 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.`,
      accept: {
        text: '삭제',
        onClick: () => boardDeleteMutate(id),
      },
    });
  };

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
    add: <CommunityBoardForm category={category} />,
  }[mode];

  return (
    <Section>
      <Section.Header
        title={title}
        description={`${title}을 추가하거나 삭제할 수 있어요`}
      >
        <Menubar>
          <Menubar.Item
            selected={mode === 'view'}
            onClick={() => handleMenubarItemClick('view')}
          >
            보기
          </Menubar.Item>
          <Menubar.Item
            selected={mode === 'add'}
            onClick={() => handleMenubarItemClick('add')}
          >
            추가
          </Menubar.Item>
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
