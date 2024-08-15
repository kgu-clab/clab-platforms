import { Button, Table } from '@clab-platforms/design-system';

import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import useModal from '@hooks/common/useModal';
import { useActivityGroupBoardDeleteMutation } from '@hooks/queries';
import { formattedDate } from '@utils/date';

import { ActivityBoardType } from '@type/activity';

import ActivityBoardEditModal from '../ActivityBoardEditModal/ActivityBoardEditModal';

interface ActivityConfigTableSectionProps {
  tableList: ActivityBoardType[];
  groupId: number;
}

const ActivityConfigTableSection = ({
  tableList,
  groupId,
}: ActivityConfigTableSectionProps) => {
  const { openModal } = useModal();
  const { activityGroupBoardDeleteMutate } =
    useActivityGroupBoardDeleteMutation();

  const handleDeleteNoticeClick = (activityGroupBoardId: number) => {
    activityGroupBoardDeleteMutate(activityGroupBoardId);
  };
  const handleEditNoticeClick = (prevData: ActivityBoardType) => {
    return openModal({
      title: '수정하기',
      custom: <ActivityBoardEditModal groupId={groupId} prevData={prevData} />,
    });
  };

  return (
    <Section>
      <Table head={TABLE_HEAD.ACTIVITY_GROUP_BOARD}>
        {tableList.map((board, index) => (
          <Table.Row key={board.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell className="truncate">{board.title}</Table.Cell>
            <Table.Cell>{formattedDate(board.updatedAt)}</Table.Cell>
            <Table.Cell className="space-x-2">
              <Button size="sm" onClick={() => handleEditNoticeClick(board)}>
                수정
              </Button>
              <Button
                size="sm"
                color="red"
                onClick={() => handleDeleteNoticeClick(board.id)}
              >
                삭제
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </Section>
  );
};

export default ActivityConfigTableSection;
