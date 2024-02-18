import { useLocation } from 'react-router-dom';
import Header from '@components/common/Header/Header';
import StudentSection from '@components/group/StudentSection/StudentSection';

const GroupStudentPage = () => {
  const location = useLocation();
  const id = location.state.id;
  const name = location.state.name;

  return (
    <div className="w-full space-y-4">
      <Header title={['활동', name, '인원목록']} />
      <StudentSection groupId={id} />
    </div>
  );
};
export default GroupStudentPage;
