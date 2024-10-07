import { useParams } from 'react-router-dom';

import { Button, Table } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import File from '@components/common/File/File';
import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { GROUP_MESSAGE } from '@constants/message';
import { ACTIVITY_MEMBER_ROLE, ACTIVITY_MEMBER_STATE } from '@constants/state';
import { useModal } from '@hooks/common/useModal';
import {
  useActivityGroupBoardByParent,
  useActivityGroupMemberList,
} from '@hooks/queries';
import {
  calOverDate,
  formattedDate,
  isDateValid,
  toKoreaISOString,
} from '@utils/date';

import type { ActivityBoardType } from '@type/activity';

import AssignmentFeedbackModal from './AssignmentFeedbackModal';

interface AssignmentListSectionProps {
  dueDate: string;
}

const AssignmentListSection = ({ dueDate }: AssignmentListSectionProps) => {
  const { id, assignmentId } = useParams();
  const { open } = useModal();
  if (!assignmentId || !id) {
    throw new Error(GROUP_MESSAGE.NO_ACTIVITY);
  }
  const { data: assignmentList } = useActivityGroupBoardByParent({
    parentId: +assignmentId,
    size: 99,
  });
  const { data: members } = useActivityGroupMemberList({
    activityGroupId: +id,
    size: 99,
  });

  const memberList = members?.items
    ? members.items
        .filter((member) => member.status === ACTIVITY_MEMBER_STATE.ACCEPTED)
        .filter((member) => member.role !== ACTIVITY_MEMBER_ROLE.LEADER)
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
    return open({
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
          <div className="overflow-x-auto">
            <Table head={TABLE_HEAD.ACTIVITY_GROUP_ASSIGNMENT}>
              {assignmentList.items.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.memberId}</Table.Cell>
                  <Table.Cell>{item.memberName}</Table.Cell>
                  <Table.Cell
                    className={cn(
                      isDateValid(dueDate, toKoreaISOString(item.updatedAt))
                        ? 'text-red-500'
                        : '',
                    )}
                  >
                    {item.updatedAt
                      ? isDateValid(dueDate, toKoreaISOString(item.updatedAt))
                        ? calOverDate(dueDate, toKoreaISOString(item.updatedAt))
                        : formattedDate(toKoreaISOString(item.updatedAt))
                      : '-'}
                  </Table.Cell>
                  <Table.Cell className="hover:underline">
                    {item.files
                      ? item.files.map((file) => (
                          <File
                            href={file.fileUrl}
                            name={file.originalFileName}
                            key={file.fileUrl}
                          />
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
          </div>
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
