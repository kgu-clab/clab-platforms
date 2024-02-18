import Content from '@components/common/Content/Content';
import AssignmentUploadSection from '@components/group/AssignmentUploadSection/AssignmentUploadSection';
import { useLocation } from 'react-router-dom';
import AssignmentFeedbackSection from '@components/group/AssignmentFeedbackSection/AssignmentFeedbackSection';
import { useActivityGroupBoard } from '@hooks/queries/useActivityGroupBoard';
import { useActivityGroupBoardsMyAssignment } from '@hooks/queries/useActivityGroupBoardsMyAssignment';
import { COMMUNITY_MESSAGE } from '@constants/message';

const GroupAssignmentPage = () => {
  const location = useLocation();
  const { groupId, id, groupName } = location.state;
  const { data: boardData } = useActivityGroupBoard(id);
  const { data: mySubmit } = useActivityGroupBoardsMyAssignment(id);

  if (boardData === undefined) {
    throw new Error(COMMUNITY_MESSAGE.NO_ARTICLE);
  }
  return (
    <Content>
      <AssignmentUploadSection
        id={id}
        activityGroupId={groupId}
        groupName={groupName}
        weeklyActivities={boardData}
        mySubmit={mySubmit}
      />
      <AssignmentFeedbackSection
        assignmentId={id}
        mySubmit={mySubmit}
        activityGroupId={groupId}
      />
    </Content>
  );
};

export default GroupAssignmentPage;
