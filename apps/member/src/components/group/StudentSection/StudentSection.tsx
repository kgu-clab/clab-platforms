import { useState } from 'react';
import { Button } from '@clab/design-system';
import Section from '@components/common/Section/Section';
import Table from '@components/common/Table/Table';
import ErrorPage from '@pages/ErrorPage/ErrorPage';

interface MemberData {
  id: number;
  memberId: string;
  memberName: string;
  department: string;
  role: string;
}

interface StudentSectionProps {
  proposers: MemberData[];
  members: MemberData[];
}

const membersHead = ['번호', '학번', '이름', '전공', '역할'];
const proposersHead = ['번호', '학번', '이름', '전공', '비고'];

const StudentSection = ({ proposers, members }: StudentSectionProps) => {
  const [membersList, setMembersList] = useState(members);
  const [proposersList, setProposersList] = useState(proposers);

  const nextId = members.length + 1;

  const handleAccept = (id: number) => {
    const data = proposers.find((proposer) => proposer.id == id);

    if (data === undefined) {
      return <ErrorPage />;
    }
    const { memberId, memberName, department, role } = data;

    const member = {
      id: nextId,
      memberId: memberId,
      memberName: memberName,
      department: department,
      role: role,
    };
    setMembersList((members) => members.concat(member));

    setProposersList((proposers) =>
      proposers.filter((proposer) => proposer.id !== +id),
    );
  };

  const handleReject = (id: number) => {
    setProposersList((proposers) =>
      proposers.filter((proposer) => proposer.id !== +id),
    );
  };

  return (
    <Section>
      {/* 수강생 목록 */}
      <div className="pb-24">
        <h1 className="pb-4 text-xl font-semibold">수강생 목록</h1>

        <div className="relative overflow-x-auto overflow-y-auto rounded-md bg-white shadow">
          <Table head={membersHead} className="w-full">
            {membersList.map((member) => (
              <Table.Row key={member.id} className="text-center">
                <td className="border p-2">{member.id}</td>
                <td className="border p-2">{member.memberId}</td>
                <td className="border p-2">{member.memberName}</td>
                <td className="border p-2">{member.department}</td>
                <td className="border p-2">{member.role}</td>
              </Table.Row>
            ))}
          </Table>
        </div>
      </div>

      {/* 신청자 목록 */}
      <div>
        <h1 className="pb-4 text-xl font-semibold">신청자 목록</h1>
        {proposersList.length === 0 ? (
          <div className="w-full rounded-lg border border-red-200 bg-red-50 p-5 text-center">
            <p className="text-red-800">신청자가 없습니다.</p>
          </div>
        ) : (
          <div className="relative overflow-x-auto overflow-y-auto rounded-md bg-white shadow">
            <Table head={proposersHead} className="w-full">
              {proposersList.map((proposer) => (
                <Table.Row key={proposer.id} className="text-center">
                  <td className="border p-2">{proposer.id}</td>
                  <td className="border p-2">{proposer.memberId}</td>
                  <td className="border p-2">{proposer.memberName}</td>
                  <td className="border p-2">{proposer.department}</td>
                  <td className="border p-2">
                    <Button
                      color="red"
                      className="mr-2"
                      onClick={() => handleAccept(proposer.id)}
                    >
                      수락
                    </Button>
                    <Button
                      color="blue"
                      onClick={() => handleReject(proposer.id)}
                    >
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
