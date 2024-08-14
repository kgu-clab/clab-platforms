import { useParams } from 'react-router-dom';

import { Button, Table } from '@clab-platforms/design-system';

import File from '@components/common/File/File';
import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { GROUP_MESSAGE } from '@constants/message';
import useModal from '@hooks/common/useModal';
import { useActivityGroupBoardByParent } from '@hooks/queries/activity/useActivityGroupBoardByParent';
import { useActivityGroupMemberList } from '@hooks/queries/activity/useActivityGroupMemberList';
import { formattedDate } from '@utils/date';

import type { ActivityBoardType } from '@type/activity';

import AssignmentFeedbackModal from '../AssignmentFeedbackModal/AssignmentFeedbackModal';

const AssignmentListSection = () => {
  const { id, assignmentId } = useParams();
  const { openModal } = useModal();

  if (!assignmentId || !id) {
    throw new Error(GROUP_MESSAGE.NO_ACTIVITY);
  }
  const { data: assignmentList } = useActivityGroupBoardByParent(+assignmentId);
  const { data: members } = useActivityGroupMemberList(+id);

  const memberList = members?.items
    ? members.items
        .filter((member) => member.status === 'ACCEPTED')
        .filter((member) => member.role !== 'LEADER')
    : [];
  const assignedMemberList = assignmentList.items.map(
    (member) => member.memberName,
  );
  const notAssignedMemberList = memberList.filter(
    (member) => !assignedMemberList.includes(member.memberName),
  );

  const handleAssignmentDetailClick = (
    post: ActivityBoardType,
    groupId: number,
    assignmentId: number,
  ) => {
    return openModal({
      custom: (
        <AssignmentFeedbackModal
          post={post}
          groupId={groupId}
          assignmentId={assignmentId}
        />
      ),
    });
  };

  return (
    <>
      <Section>
        <Section.Header title="제출물 조회" />
        <Section.Body>
          <Table head={TABLE_HEAD.ACTIVITY_GROUP_ASSIGNMENT}>
            {assignmentList.items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.memberId}</Table.Cell>
                <Table.Cell>{item.memberName}</Table.Cell>
                <Table.Cell>
                  {item.files ? formattedDate(item.updatedAt || '') : '-'}
                </Table.Cell>
                <Table.Cell className="hover:underline">
                  {item.files
                    ? item.files.map((file) => (
                        <File key={file.fileUrl} href={file.fileUrl}>
                          {file.originalFileName}
                        </File>
                      ))
                    : '-'}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    onClick={() =>
                      handleAssignmentDetailClick(item, +id, +assignmentId)
                    }
                  >
                    더보기
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </Section.Body>
      </Section>
      <Section>
        <Section.Header title="미제출 인원 조회" />
        <Section.Body>
          <Table head={TABLE_HEAD.ACTIVITY_GROUP_PARTICIPANTS}>
            {notAssignedMemberList.map((item, index) => (
              <Table.Row key={item.memberId}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{item.memberId}</Table.Cell>
                <Table.Cell>{item.memberName}</Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </Section.Body>
      </Section>
    </>
  );
};

export default AssignmentListSection;
