import { Table } from '@clab-platforms/design-system';

import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { useSchedule } from '@hooks/queries';
import { formattedDate } from '@utils/date';

import { useScheduleInfoModal } from '../hooks/useScheduleInfoModal';

export function TableSection() {
  const { open } = useScheduleInfoModal();
  const { data } = useSchedule();

  return (
    <Section>
      <Table head={TABLE_HEAD.CALENDAR_TABLE} className="table-fixed">
        {data.items.map(({ id, title, detail, startDateTime, endDateTime }) => (
          <Table.Row
            key={id}
            onClick={() => open({ detail, startDateTime, endDateTime })}
          >
            <Table.Cell>{`${formattedDate(startDateTime)} ~ ${formattedDate(endDateTime)}`}</Table.Cell>
            <Table.Cell>{title}</Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </Section>
  );
}
