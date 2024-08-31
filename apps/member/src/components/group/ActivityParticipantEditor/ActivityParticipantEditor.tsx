import { useState } from 'react';

import { Button, Table } from '@clab-platforms/design-system';

import Section from '@components/common/Section/Section';
import Select from '@components/common/Select/Select';

import { TABLE_HEAD } from '@constants/head';
import { ACTIVITY_MEMBER_ROLE, ACTIVITY_MEMBER_STATE } from '@constants/state';
import useModal from '@hooks/common/useModal';
import {
  useActivityGroupApplication,
  useActivityGroupApplicationMutation,
  useActivityGroupMemberRoleMutation,
} from '@hooks/queries';
import { toKoreaActivityGroupMemberLevel } from '@utils/string';

import type { ActivityMemberRoleType } from '@type/activity';

interface ActivityParticipantEditorProps {
  groupId: number;
}

const memberOptions = Object.keys(ACTIVITY_MEMBER_ROLE).map((key) => ({
  name: toKoreaActivityGroupMemberLevel(key as ActivityMemberRoleType),
  value: key,
}));

const ActivityParticipantEditor = ({
  groupId,
}: ActivityParticipantEditorProps) => {
  const [role, setRole] = useState<ActivityMemberRoleType>(
    ACTIVITY_MEMBER_ROLE.MEMBER,
  );
  const { activityGroupApplicationMutate } =
    useActivityGroupApplicationMutation();
  const { data: applyMemberList } = useActivityGroupApplication({
    activityGroupId: groupId,
  });
  const { activityGroupMemberRoleMutate } =
    useActivityGroupMemberRoleMutation();
  const { openModal } = useModal();

  const handleOpenModal = (name: string, content: string) => {
    openModal({
      title: '📝 ' + name,
      content: content,
    });
  };

  const handleAcceptClick = (applierId: string) => {
    activityGroupApplicationMutate({
      activityGroupId: groupId,
      memberId: applierId,
      status: ACTIVITY_MEMBER_STATE.ACCEPTED,
    });
  };

  const handleRejectClick = (applierId: string) => {
    activityGroupApplicationMutate({
      activityGroupId: groupId,
      memberId: applierId,
      status: ACTIVITY_MEMBER_STATE.REJECTED,
    });
  };

  const handleLeaderClick = (memberId: string) => {
    activityGroupMemberRoleMutate({
      activityGroupId: groupId,
      memberId,
      position: role,
    });
  };

  return (
    <Section>
      <h1 className="pb-4 text-xl font-semibold">참여자 관리</h1>
      {applyMemberList.items.length === 1 ? (
        <div className="w-full rounded-lg border border-red-200 bg-red-50 p-5 text-center">
          <p className="text-red-800">신청자가 없습니다.</p>
        </div>
      ) : (
        <Table head={TABLE_HEAD.ACTIVITY_GROUP_APPLIES} className="w-full">
          {applyMemberList.items.map(
            ({ memberName, memberId, status, role, applyReason }, id) => (
              <Table.Row key={id} className="text-center">
                <Table.Cell>{id + 1}</Table.Cell>
                <Table.Cell>{memberId}</Table.Cell>
                <Table.Cell>{memberName}</Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                <Table.Cell>{toKoreaActivityGroupMemberLevel(role)}</Table.Cell>
                <Table.Cell className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      handleOpenModal(`${memberName}(${memberId})`, applyReason)
                    }
                  >
                    지원서
                  </Button>
                  {status !== ACTIVITY_MEMBER_STATE.ACCEPTED && (
                    <Button
                      size="sm"
                      color="green"
                      onClick={() => handleAcceptClick(memberId)}
                    >
                      승인
                    </Button>
                  )}
                  <Button
                    size="sm"
                    color="red"
                    onClick={() => handleRejectClick(memberId)}
                  >
                    거절
                  </Button>
                </Table.Cell>
                <Table.Cell className="flex justify-center gap-1">
                  <Select
                    className="w-fit"
                    id="role"
                    onChange={(e) =>
                      setRole(e.target.value as ActivityMemberRoleType)
                    }
                    options={memberOptions}
                  />
                  <Button onClick={() => handleLeaderClick(memberId)}>
                    변경하기
                  </Button>
                </Table.Cell>
              </Table.Row>
            ),
          )}
        </Table>
      )}
    </Section>
  );
};

export default ActivityParticipantEditor;
