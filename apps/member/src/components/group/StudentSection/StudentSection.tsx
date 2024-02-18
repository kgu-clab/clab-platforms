import { Button } from '@clab/design-system';
import Section from '@components/common/Section/Section';
import Table from '@components/common/Table/Table';
import { useActivityGroupMember } from '@hooks/queries/useActivityGroupMember';
import { useActivityGroupAdminApplyByStatus } from '@hooks/queries/useActivityGroupAdminApplyByStatus';
import { useActivityGroupAdminAcceptMutation } from '@hooks/queries/useActivityGroupAdminAcceptMutation';

interface StudentSectionProps {
  groupId: number;
}

const membersHead = ['번호', '학번', '이름', '역할'];
const appliesHead = ['번호', '학번', '이름', '비고'];

const StudentSection = ({ groupId }: StudentSectionProps) => {
  const { data: memberData } = useActivityGroupMember(groupId);
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
      {/* 수강생 목록 */}
      <div className="pb-24">
        <h1 className="pb-4 text-xl font-semibold">수강생 목록</h1>

        <div className="relative overflow-x-auto overflow-y-auto rounded-md bg-white shadow">
          <Table head={membersHead} className="w-full">
            {memberData.items.map(({ memberId, memberName, role }, id) => (
              <Table.Row key={id} className="text-center">
                <td className="border p-2">{id + 1}</td>
                <td className="border p-2">{memberId}</td>
                <td className="border p-2">{memberName}</td>
                <td className="border p-2">{role}</td>
              </Table.Row>
            ))}
          </Table>
        </div>
      </div>

      {/* 신청자 목록 */}
      <div>
        <h1 className="pb-4 text-xl font-semibold">신청자 목록</h1>
        {applyMemberData.items.length === 0 ? (
          <div className="w-full rounded-lg border border-red-200 bg-red-50 p-5 text-center">
            <p className="text-red-800">신청자가 없습니다.</p>
          </div>
        ) : (
          <div className="relative overflow-x-auto overflow-y-auto rounded-md bg-white shadow">
            <Table head={appliesHead} className="w-full">
              {applyMemberData.items.map(({ memberName, memberId }, id) => (
                <Table.Row key={id} className="text-center">
                  <td className="border p-2">{id + 1}</td>
                  <td className="border p-2">{memberId}</td>
                  <td className="border p-2">{memberName}</td>
                  <td className="border p-2">
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
      </div>
    </Section>
  );
};

export default StudentSection;
