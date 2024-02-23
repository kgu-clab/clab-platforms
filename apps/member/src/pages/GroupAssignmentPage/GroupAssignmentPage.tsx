import Content from '@components/common/Content/Content';
import AssignmentUploadSection from '@components/group/AssignmentUploadSection/AssignmentUploadSection';
import { useLocation, useParams } from 'react-router-dom';
import AssignmentFeedbackSection from '@components/group/AssignmentFeedbackSection/AssignmentFeedbackSection';
import { useActivityGroupBoard } from '@hooks/queries/useActivityGroupBoard';
import { useActivityGroupBoardsMyAssignment } from '@hooks/queries/useActivityGroupBoardsMyAssignment';
import { COMMUNITY_MESSAGE, GROUP_MESSAGE } from '@constants/message';

const GroupAssignmentPage = () => {
  const { id } = useParams();
  const { state } = useLocation();

  if (!id) throw new Error(GROUP_MESSAGE.NO_ACTIVITY);

  const { data: boardData } = useActivityGroupBoard(id);
  const { data: mySubmit } = useActivityGroupBoardsMyAssignment(id);

  if (boardData === undefined) {
    throw new Error(COMMUNITY_MESSAGE.NO_ARTICLE);
  }
  return (
    <Content>
      <AssignmentUploadSection
        id={id}
        activityGroupId={id}
        groupName={state?.name || '알 수 없는 활동'}
        weeklyActivities={boardData}
        mySubmit={mySubmit}
      />
      <AssignmentFeedbackSection
        assignmentId={id}
        activityGroupId={id}
        mySubmit={mySubmit}
      />
    </Content>
  );
};

export default GroupAssignmentPage;
