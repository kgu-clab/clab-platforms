import Content from '@components/common/Content/Content';
import AssignmentUploadSection from '@components/group/AssignmentUploadSection/AssignmentUploadSection';
import { useLocation } from 'react-router-dom';
import groupList from '@mocks/data/groupList.json';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import AssignmentFeedbackSection from '@components/group/AssignmentFeedbackSection/AssignmentFeedbackSection';

interface assignmentData {
  id: number;
  title: string;
  content: string;
  deadline: string;
}
interface weeklyActivitiesData {
  week: number;
  content: string;
  assignments: assignmentData[];
}
interface GroupData {
  id: number;
  name: string;
  weeklyActivities: weeklyActivitiesData[];
}

const GroupAssignmentPage = () => {
  const location = useLocation();
  const { groupId, week, id } = location.state;

  const data: GroupData | undefined = groupList.find(
    (group) => group.id === groupId,
  );

  if (data === undefined) {
    return <ErrorPage />;
  }

  return (
    <Content>
      <AssignmentUploadSection
        id={groupId}
        week={week}
        activityId={id}
        name={data.name}
        weeklyActivities={data.weeklyActivities}
      />
      <AssignmentFeedbackSection />
    </Content>
  );
};

export default GroupAssignmentPage;
