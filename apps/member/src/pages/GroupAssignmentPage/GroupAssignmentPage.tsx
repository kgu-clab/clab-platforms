import { useLocation, useParams } from 'react-router-dom';

import Content from '@components/common/Content/Content';
import File from '@components/common/File/File';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import AssignmentListSection from '@components/group/AssignmentListSection/AssignmentListSection';
import AssignmentUploadSection from '@components/group/AssignmentUploadSection/AssignmentUploadSection';

import { GROUP_MESSAGE } from '@constants/message';
import { ACTIVITY_MEMBER_ROLE } from '@constants/state';
import {
  useActivityGroup,
  useActivityGroupBoardMyAssignment,
  useMyProfile,
} from '@hooks/queries';
import { useActivityGroupBoard } from '@hooks/queries/activity/useActivityGroupBoard';
import { toKoreaISOString } from '@utils/date';

const GroupAssignmentPage = () => {
  const { id, assignmentId } = useParams();
  const { state } = useLocation();
  const { data: myProfile } = useMyProfile();

  if (!id || !assignmentId || !state?.name) {
    throw new Error(GROUP_MESSAGE.NO_ACTIVITY);
  }
  const { data: board } = useActivityGroupBoard(+assignmentId);
  const { data: myAssignment } =
    useActivityGroupBoardMyAssignment(+assignmentId);
  const { data: groupDetail } = useActivityGroup(+id);

  const isLeader = groupDetail?.groupMembers.some(
    (member) =>
      member.role === ACTIVITY_MEMBER_ROLE.LEADER &&
      member.memberId === myProfile?.id,
  );
  const feedback = myAssignment?.[0];

  return (
    <Content>
      <Header title={[...state.name]} />
      <Section>
        <Section.Header title="과제 설명" />
        <Section.Body>
          {board?.files.length !== 0 && (
            <div className="mb-2 flex gap-2 text-sm">
              <p className="hidden text-gray-500 sm:block">첨부파일 | </p>
              {board.files.map((file) => (
                <File key={file.fileUrl} href={file.fileUrl}>
                  {file.originalFileName}
                </File>
              ))}
            </div>
          )}
          <hr />
          <p className="pt-3">{board?.content}</p>
        </Section.Body>
      </Section>
      {isLeader ? (
        <AssignmentListSection />
      ) : (
        <>
          <AssignmentUploadSection
            activityGroupId={+id}
            assignmentId={+assignmentId}
            dueDateTime={toKoreaISOString(board?.dueDateTime ?? '')}
            myAssignment={myAssignment?.[0]}
          />
          <Section>
            <Section.Header title="피드백" />
            <p className="whitespace-pre-line break-keep">
              {feedback?.feedbacks?.[0]
                ? feedback.feedbacks?.[0].content
                : GROUP_MESSAGE.NO_FEEDBACK}
            </p>
          </Section>
        </>
      )}
    </Content>
  );
};

export default GroupAssignmentPage;
