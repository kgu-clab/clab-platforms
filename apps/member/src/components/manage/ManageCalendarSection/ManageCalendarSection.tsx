import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Menubar, MenubarItem, Table } from '@clab/design-system';

import AddScheduleForm from '@components/calendar/AddScheduleForm/AddScheduleForm';
import ActionButton from '@components/common/ActionButton/ActionButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { PATH } from '@constants/path';
import useModal from '@hooks/common/useModal';
import { usePagination } from '@hooks/common/usePagination';
import { useSchedule, useScheduleDeleteMutation } from '@hooks/queries';
import { formattedDate } from '@utils/date';
import { toDecodeHTMLEntities, toPriorityText } from '@utils/string';

type Mode = 'view' | 'add';

const ManageCalendarSection = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const [mode, setMode] = useState<Mode>('view');
  const { page, size, handlePageChange } = usePagination();

  const { data } = useSchedule();
  const { scheduleDeleteMutate } = useScheduleDeleteMutation();

  const handleMenubarItemClick = useCallback((mode: Mode) => {
    setMode(mode);
  }, []);

  const handleTableRowClick = useCallback(() => {
    navigate(PATH.CALENDER);
  }, [navigate]);

  const handleDeleteButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      e.stopPropagation();
      return openModal({
        title: '스케줄 삭제',
        content: `해당 스케줄을 정말 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.`,
        accept: {
          text: '삭제',
          onClick: () => scheduleDeleteMutate(id),
        },
      });
    },
    [openModal, scheduleDeleteMutate],
  );

  const renderView = {
    view: (
      <Table head={TABLE_HEAD.CALENDAR_SCHEDULE}>
        {data.items.map(({ id, title, startDate, endDate, priority }) => (
          <Table.Row
            key={id}
            className="text-nowrap text-center"
            onClick={handleTableRowClick}
          >
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell className="w-full truncate text-left">
              {toDecodeHTMLEntities(title)}
            </Table.Cell>
            <Table.Cell>{formattedDate(startDate)}</Table.Cell>
            <Table.Cell>{formattedDate(endDate)}</Table.Cell>
            <Table.Cell>{toPriorityText(priority)}</Table.Cell>
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
    add: <AddScheduleForm onSubmit={() => handleMenubarItemClick('view')} />,
  }[mode];

  return (
    <Section>
      <Section.Header
        title="일정"
        description="일정을 추가하거나 삭제할 수 있어요"
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

export default ManageCalendarSection;
