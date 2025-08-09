import { Table } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import { useMyProfile, useSupportDetail } from '@hooks/queries';
import { formattedDate, toKoreaISOString } from '@utils/date';
import { formatMemberName } from '@utils/string';

import type { Support } from '@type/support';

import SupportRowBadges from './SupportRowBadges';
import SupportRowContent from './SupportRowContent';

interface SupportTableRowProps {
  data: Support;
  showAll?: boolean;
  currentOpenItemIndex: number;
  onClick(id: number): void;
}

const SupportTableRow = ({
  data,
  showAll = true,
  currentOpenItemIndex,
  onClick,
}: SupportTableRowProps) => {
  const { id, title, name, createdAt, writerId, status, category } = data;
  const { data: myProfile } = useMyProfile();
  const { data: supportDetail } = useSupportDetail(id, true);
  const isCurrentItemOpen = currentOpenItemIndex === id;

  const handleClose = () => {
    onClick(-1);
  };

  return (
    <>
      <Table.Row
        onClick={() => showAll && onClick(id)}
        className={cn(
          'cursor-pointer border-none',
          isCurrentItemOpen && 'bg-gray-50',
        )}
      >
        <Table.Cell className="w-20">{id}</Table.Cell>
        <Table.Cell className="overflow-hidden truncate whitespace-nowrap">
          <span title={title}>{title}</span>
        </Table.Cell>
        <Table.Cell>{formatMemberName(name, writerId)}</Table.Cell>
        <Table.Cell>{formattedDate(toKoreaISOString(createdAt))}</Table.Cell>
        <Table.Cell>
          <SupportRowBadges category={category} status={status} />
        </Table.Cell>
      </Table.Row>

      {isCurrentItemOpen && supportDetail && (
        <SupportRowContent
          data={supportDetail.data}
          myProfile={myProfile}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default SupportTableRow;
