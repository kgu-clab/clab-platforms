import { useState } from 'react';

import {
  Badge,
  BadgeColorVariant,
  Button,
  Checkbox,
  Menubar,
  Table,
} from '@clab-platforms/design-system';

import EmptyBox from '@components/common/EmptyBox/EmptyBox';
import Pagination from '@components/common/Pagination/Pagination';
import Section from '@components/common/Section/Section';
import { CheckConfirmModal } from '@components/modal';

import { TABLE_HEAD } from '@constants/head';
import { GROUP_MESSAGE } from '@constants/message';
import { ACTIVITY_MEMBER_ROLE, ACTIVITY_MEMBER_STATE } from '@constants/state';
import { useModal } from '@hooks/common/useModal';
import { usePagination } from '@hooks/common/usePagination';
import useToast from '@hooks/common/useToast';
import {
  useActivityGroupApplication,
  useActivityGroupApplicationMutation,
  useActivityGroupMemberRoleMutation,
} from '@hooks/queries';
import {
  toKoreaActivityGroupMemberLevel,
  toKoreaActivityGroupMemberStatus,
} from '@utils/string';

import type { ActivityMemberRoleType, MemberStatusType } from '@type/activity';

interface ActivityParticipantEditorProps {
  groupId: number;
}

interface ChangeRoleProps {
  memberId: string;
  status: boolean;
}

function getStatusColor(state: MemberStatusType): BadgeColorVariant {
  switch (state) {
    case ACTIVITY_MEMBER_STATE.ACCEPTED:
      return 'green';
    case ACTIVITY_MEMBER_STATE.REJECTED:
      return 'red';
    case ACTIVITY_MEMBER_STATE.WAITING:
      return 'yellow';
  }
}
function getRoleColor(state: ActivityMemberRoleType): BadgeColorVariant {
  switch (state) {
    case ACTIVITY_MEMBER_ROLE.MEMBER:
      return 'secondary';
    case ACTIVITY_MEMBER_ROLE.LEADER:
      return 'blue';
  }
}

const ActivityParticipantEditor = ({
  groupId,
}: ActivityParticipantEditorProps) => {
  const toast = useToast();
  const [mode, setMode] = useState(false);
  const { page, size, handlePageChange } = usePagination({ defaultSize: 10 });
  const { open, close } = useModal();
  const { activityGroupApplicationMutate } =
    useActivityGroupApplicationMutation();
  const { data: applyMemberList } = useActivityGroupApplication({
    activityGroupId: groupId,
    page,
    size,
  });
  const { activityGroupMemberRoleMutate } =
    useActivityGroupMemberRoleMutation();
  const [selectedMember, setSelectedMember] = useState<Array<ChangeRoleProps>>(
    () =>
      Array.from(applyMemberList.items).map((member) => ({
        memberId: member.memberId,
        status: false,
      })),
  );
  const handleOpenModal = (name: string, content: string) => {
    open({
      title: '📝 ' + name,
      content: content,
    });
  };

  const handleAcceptClick = (applierId: string) => {
    activityGroupApplicationMutate({
      activityGroupId: groupId,
      memberId: [applierId],
      status: ACTIVITY_MEMBER_STATE.ACCEPTED,
    });
  };

  const handleRejectClick = (applierId: string) => {
    activityGroupApplicationMutate({
      activityGroupId: groupId,
      memberId: [applierId],
      status: ACTIVITY_MEMBER_STATE.REJECTED,
    });
  };

  const handleLeaderClick = (
    memberId: string,
    role: ActivityMemberRoleType,
  ) => {
    const changeRole =
      role === ACTIVITY_MEMBER_ROLE.MEMBER
        ? ACTIVITY_MEMBER_ROLE.LEADER
        : ACTIVITY_MEMBER_ROLE.MEMBER;

    activityGroupMemberRoleMutate({
      activityGroupId: groupId,
      memberId: memberId,
      position: changeRole,
    });
  };

  const handleChangeRoleToggle = (id: number) => {
    setSelectedMember((prev) => {
      const updateData = [...prev];
      updateData[id] = { ...updateData[id], status: !updateData[id].status };
      return updateData;
    });
  };

  const handleMultipleChangeClick = () => {
    const changeList = selectedMember
      .filter((member) => member.status === true)
      .map((member) => member.memberId);
    if (!changeList.length) {
      return toast({
        state: 'error',
        message: '선택된 멤버가 없어요',
      });
    }
    open({
      content: (
        <CheckConfirmModal
          message="승인하시겠습니까?"
          handleConfirmButton={() => {
            activityGroupApplicationMutate({
              activityGroupId: groupId,
              memberId: changeList,
              status: ACTIVITY_MEMBER_STATE.ACCEPTED,
            });
          }}
          handleClose={close}
        />
      ),
    });
  };

  return (
    <Section>
      <Section.Header title="참여자 관리">
        {!(applyMemberList.items.length === 1) && (
          <Menubar>
            <Menubar.Item
              selected={mode}
              onClick={() => setMode((prev) => !prev)}
            >
              선택
            </Menubar.Item>
          </Menubar>
        )}
      </Section.Header>
      <Section.Body>
        {applyMemberList.items.length === 1 ? (
          <EmptyBox>{GROUP_MESSAGE.NO_PARTICIPANT}</EmptyBox>
        ) : (
          <Table head={TABLE_HEAD.ACTIVITY_GROUP_APPLIES} className="w-full">
            {applyMemberList.items.map(
              ({ memberName, memberId, status, role, applyReason }, id) => (
                <Table.Row key={id} className="text-center">
                  <Table.Cell>{id + 1}</Table.Cell>
                  <Table.Cell>{memberId}</Table.Cell>
                  <Table.Cell>{memberName}</Table.Cell>
                  <Table.Cell>
                    <Badge color={getStatusColor(status)}>
                      {toKoreaActivityGroupMemberStatus(status)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={getRoleColor(role)}>
                      {toKoreaActivityGroupMemberLevel(role)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="space-x-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        handleOpenModal(
                          `${memberName}(${memberId})`,
                          applyReason,
                        )
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
                    {status !== ACTIVITY_MEMBER_STATE.ACCEPTED && mode ? (
                      <Checkbox
                        id={`changeRole ${id}`}
                        name={`changeRole ${id}`}
                        label="승인하기"
                        checked={selectedMember[id].status}
                        onChange={() => handleChangeRoleToggle(id)}
                      />
                    ) : status === ACTIVITY_MEMBER_STATE.ACCEPTED ? (
                      <Button
                        size="sm"
                        onClick={() => handleLeaderClick(memberId, role)}
                      >
                        {role === ACTIVITY_MEMBER_ROLE.MEMBER
                          ? '리더로 변경하기'
                          : '멤버로 변경하기'}
                      </Button>
                    ) : (
                      '-'
                    )}
                  </Table.Cell>
                </Table.Row>
              ),
            )}
          </Table>
        )}
        {mode && (
          <Button
            className="mt-4 w-full"
            size="sm"
            onClick={handleMultipleChangeClick}
          >
            멤버 승인 처리하기
          </Button>
        )}
        <Pagination
          className="mt-4 justify-center"
          totalItems={applyMemberList.totalItems}
          postLimit={size}
          onChange={handlePageChange}
          page={page}
        />
      </Section.Body>
    </Section>
  );
};

export default ActivityParticipantEditor;
