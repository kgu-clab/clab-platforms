import { Button, Table } from '@clab/design-system';
import Section from '@components/common/Section/Section';
import { useActivityGroupAdminApplyByStatus } from '@hooks/queries/useActivityGroupAdminApplyByStatus';
import { useActivityGroupAdminAcceptMutation } from '@hooks/queries/useActivityGroupAdminAcceptMutation';
import { TABLE_HEAD } from '@constants/head';
import useModal from '@hooks/common/useModal';

interface ActivityParticipantEditorProps {
  groupId: number;
}

const ActivityParticipantEditor = ({
  groupId,
}: ActivityParticipantEditorProps) => {
  const { data: applyMemberList } = useActivityGroupAdminApplyByStatus(groupId);
  const { activityMemberAcceptMutate } = useActivityGroupAdminAcceptMutation();

  const { openModal } = useModal();

  const handleOpenModal = (name: string, content: string) => {
    openModal({
      title: '📝 ' + name,
      content: content,
    });
  };

  const handleAccept = (applierId: string) => {
    activityMemberAcceptMutate({
      activityGroupId: groupId,
      memberId: applierId,
      status: 'ACCEPTED',
    });
  };

  const handleReject = (applierId: string) => {
    activityMemberAcceptMutate({
      activityGroupId: groupId,
      memberId: applierId,
      status: 'REJECTED',
    });
  };

  return (
    <Section>
      <h1 className="pb-4 text-xl font-semibold">참여자 관리</h1>
      {!applyMemberList.items ? (
        <div className="w-full p-5 text-center border border-red-200 rounded-lg bg-red-50">
          <p className="text-red-800">신청자가 없습니다.</p>
        </div>
      ) : (
        <Table head={TABLE_HEAD.ACTIVITY_GROUP_APPLIES} className="w-full">
          {applyMemberList.items
            .slice(1)
            .map(({ memberName, memberId, status, applyReason }, id) => (
              <Table.Row key={id} className="text-center">
                <Table.Cell>{id + 1}</Table.Cell>
                <Table.Cell>{memberId}</Table.Cell>
                <Table.Cell>{memberName}</Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                <Table.Cell className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      handleOpenModal(`${memberName}(${memberId})`, applyReason)
                    }
                  >
                    지원서
                  </Button>

                  <Button
                    size="sm"
                    color="green"
                    onClick={() => handleAccept(memberId)}
                  >
                    수락
                  </Button>
                  <Button
                    size="sm"
                    color="red"
                    onClick={() => handleReject(memberId)}
                  >
                    거절
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table>
      )}
    </Section>
  );
};

export default ActivityParticipantEditor;
