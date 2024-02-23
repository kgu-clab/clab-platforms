import { Button } from '@clab/design-system';
import Section from '@components/common/Section/Section';
import Table from '@components/common/Table/Table';

import { useActivityGroupAdminApplyByStatus } from '@hooks/queries/useActivityGroupAdminApplyByStatus';
import { useActivityGroupAdminAcceptMutation } from '@hooks/queries/useActivityGroupAdminAcceptMutation';

interface StudentSectionProps {
  groupId: number;
}

const appliesHead = ['번호', '학번', '이름', '비고'];

const StudentSection = ({ groupId }: StudentSectionProps) => {
  const { data: applyMemberData } = useActivityGroupAdminApplyByStatus(
    groupId,
    'WAITING',
  );
  const { activityMemberAcceptMutate } = useActivityGroupAdminAcceptMutation();

  const handleReject = (applierId: string) => {
    activityMemberAcceptMutate({
      activityGroupId: groupId,
      memberId: applierId,
      status: 'REJECTED',
    });
  };

  const handleAccept = (applierId: string) => {
    activityMemberAcceptMutate({
      activityGroupId: groupId,
      memberId: applierId,
      status: 'ACCEPTED',
    });
  };
  return (
    <Section>
      <h1 className="pb-4 text-xl font-semibold">신청자 목록</h1>
      {applyMemberData.items.length === 0 ? (
        <div className="w-full p-5 text-center border border-red-200 rounded-lg bg-red-50">
          <p className="text-red-800">신청자가 없습니다.</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto overflow-y-auto bg-white rounded-md shadow">
          <Table head={appliesHead} className="w-full">
            {applyMemberData.items.map(({ memberName, memberId }, id) => (
              <Table.Row key={id} className="text-center">
                <td className="p-2 border">{id + 1}</td>
                <td className="p-2 border">{memberId}</td>
                <td className="p-2 border">{memberName}</td>
                <td className="p-2 border">
                  <Button
                    color="red"
                    className="mr-2"
                    onClick={() => handleAccept(memberId)}
                  >
                    수락
                  </Button>
                  <Button color="blue" onClick={() => handleReject(memberId)}>
                    거절
                  </Button>
                </td>
              </Table.Row>
            ))}
          </Table>
        </div>
      )}
    </Section>
  );
};

export default StudentSection;
