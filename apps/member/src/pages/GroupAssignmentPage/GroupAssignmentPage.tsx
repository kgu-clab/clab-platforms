import Content from '@components/common/Content/Content';
import AssignmentUploadSection from '@components/group/AssignmentUploadSection/AssignmentUploadSection';
import { useLocation, useParams } from 'react-router-dom';
// import AssignmentFeedbackSection from '@components/group/AssignmentFeedbackSection/AssignmentFeedbackSection';
import { useActivityGroupBoard } from '@hooks/queries/useActivityGroupBoard';
import { useActivityGroupBoardsMyAssignment } from '@hooks/queries/useActivityGroupBoardsMyAssignment';
import { GROUP_MESSAGE } from '@constants/message';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import AssignmentFeedbackSection from '@components/group/AssignmentFeedbackSection/AssignmentFeedbackSection';

const GroupAssignmentPage = () => {
  const { id, assignmentId } = useParams();
  const { state } = useLocation();

  if (!id || !assignmentId || !state?.name)
    throw new Error(GROUP_MESSAGE.NO_ACTIVITY);

  const { data: boardData } = useActivityGroupBoard(assignmentId);
  const { data: mySubmit } = useActivityGroupBoardsMyAssignment(boardData?.id);

  return (
    <Content>
      <Header title={[...state.name]} />
      <Section>
        <Section.Header title="과제 설명" />
        <p className="pt-3">{boardData?.content}</p>
      </Section>
      <AssignmentUploadSection
        activityGroupId={id}
        assignmentId={assignmentId}
        dueDateTime={boardData?.dueDateTime}
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
