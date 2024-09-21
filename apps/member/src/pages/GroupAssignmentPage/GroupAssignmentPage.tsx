import { useLocation, useParams } from 'react-router-dom';

import { Badge, Button } from '@clab-platforms/design-system';

import Content from '@components/common/Content/Content';
import File from '@components/common/File/File';
import Header from '@components/common/Header/Header';
import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';
import AssignmentListSection from '@components/group/AssignmentListSection/AssignmentListSection';
import AssignmentUploadSection from '@components/group/AssignmentUploadSection/AssignmentUploadSection';
import { ActivityBoardEditModal } from '@components/modal';

import { GROUP_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import { ACTIVITY_MEMBER_ROLE } from '@constants/state';
import { useModal } from '@hooks/common/useModal';
import {
  useActivityGroup,
  useActivityGroupBoardMyAssignment,
  useMyProfile,
} from '@hooks/queries';
import { useActivityGroupBoard } from '@hooks/queries/activity/useActivityGroupBoard';
import { isImageFile } from '@utils/api';
import { formattedDate } from '@utils/date';

const GroupAssignmentPage = () => {
  const { open } = useModal();
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

  const handleEditNoticeClick = () => {
    return open({
      title: '수정하기',
      custom: <ActivityBoardEditModal groupId={+id} prevData={board} />,
    });
  };

  return (
    <Content>
      <Header title={[...state.name]} path={PATH_FINDER.ACTIVITY_DETAIL(id)} />
      <Section>
        <Section.Header title="과제 설명">
          {isLeader && (
            <Button size="sm" color="orange" onClick={handleEditNoticeClick}>
              수정
            </Button>
          )}
        </Section.Header>
        <Section.Body>
          <Badge color="blue" className="px-1">
            종료 일시 | {formattedDate(board?.dueDateTime)}
          </Badge>
          {board?.files && (
            <div className="my-2 flex gap-2">
              {board.files.map((file) =>
                isImageFile(file.fileUrl) ? (
                  <Image
                    src={file.fileUrl}
                    alt={file.originalFileName}
                    height="w-[300px]"
                    className="object-cover"
                    key={file.fileUrl}
                    isFile
                  />
                ) : (
                  <File
                    href={file.fileUrl}
                    name={file.originalFileName}
                    key={file.fileUrl}
                  />
                ),
              )}
            </div>
          )}
          <hr />
          <p className="py-3">{board?.content}</p>
        </Section.Body>
      </Section>
      {isLeader ? (
        <AssignmentListSection dueDate={board?.dueDateTime || ''} />
      ) : (
        <>
          <AssignmentUploadSection
            activityGroupId={+id}
            assignmentId={+assignmentId}
            dueDateTime={board?.dueDateTime ?? ''}
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
