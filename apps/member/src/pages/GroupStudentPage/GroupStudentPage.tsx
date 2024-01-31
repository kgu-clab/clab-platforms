import { useParams } from 'react-router-dom';
import groupList from '@mocks/data/groupList.json';
import Header from '@components/common/Header/Header';
import StudentSection from '@components/group/StudentSection/StudentSection';
import ErrorPage from '@pages/ErrorPage/ErrorPage';

interface MemberData {
  id: number;
  memberId: string;
  memberName: string;
  department: string;
  role: string;
}

interface GroupData {
  id: number;
  name: string;
  manager: string;
  proposers: MemberData[];
  members: MemberData[];
}

const GroupStudentPage = () => {
  const { id } = useParams();

  const data: GroupData | undefined = groupList.find(
    (group) => group.id === Number(id),
  );

  if (data === undefined) {
    return <ErrorPage />;
  }

  const { name, members, proposers } = data;

  return (
    <div className="w-full space-y-4">
      <Header title={['활동', name, '인원목록']} />
      <StudentSection members={members} proposers={proposers} />
    </div>
  );
};
export default GroupStudentPage;
