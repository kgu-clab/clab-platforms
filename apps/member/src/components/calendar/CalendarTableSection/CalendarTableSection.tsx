import { useCallback } from 'react';

import { Table } from '@clab-platforms/design-system';

import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import useModal from '@hooks/common/useModal';
import { useSchedule } from '@hooks/queries';
import { formattedDate, formattedDatePeriod } from '@utils/date';

const CalendarTableSection = () => {
  const { openModal } = useModal();
  const { data } = useSchedule();

  const handleScheduleClick = useCallback(
    (detail: string, startDateTime: string, endDateTime: string) => {
      openModal({
        title: '📆 일정',
        content: `일시: ${formattedDatePeriod(startDateTime, endDateTime)}\n내용: ${detail}`,
      });
    },
    [openModal],
  );

  return (
    <Section>
      <Table head={TABLE_HEAD.CALENDAR_TABLE} className="table-fixed">
        {data.items.map(({ id, title, detail, startDateTime, endDateTime }) => (
          <Table.Row
            key={id}
            onClick={() =>
              handleScheduleClick(detail, startDateTime, endDateTime)
            }
          >
            <Table.Cell>{`${formattedDate(startDateTime)} ~ ${formattedDate(endDateTime)}`}</Table.Cell>
            <Table.Cell>{title}</Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </Section>
  );
};

export default CalendarTableSection;
