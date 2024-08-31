import { useState } from 'react';

import { Menubar, Table } from '@clab-platforms/design-system';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';
import ActivityInfoModal from '@components/modal/ActivityInfoModal/ActivityInfoModal';

import { TABLE_HEAD } from '@constants/head';
import { ACTIVITY_STATE } from '@constants/state';
import useModal from '@hooks/common/useModal';
import { usePagination } from '@hooks/common/usePagination';
import {
  useActivityGroupDeleteMutation,
  useActivityGroupMember,
  useActivityGroupStatusMutation,
} from '@hooks/queries';

import type { ActivityGroupStatusType } from '@type/activity';

const ManageActivitySection = () => {
  const [mode, setMode] = useState<ActivityGroupStatusType>(
    ACTIVITY_STATE.WAITING,
  );
  const { openModal } = useModal();
  const { page, size, handlePageChange } = usePagination({
    defaultSize: 6,
    sectionName: 'activity',
  });
  const { activityGroupDeleteMutate } = useActivityGroupDeleteMutation();
  const { activityGroupStatusMutate } = useActivityGroupStatusMutation();
  const { data: groupData } = useActivityGroupMember({
    page,
    size,
    status: mode,
  });

  const handleInfoButtonClick = (groupId: number) => {
    return openModal({
      title: '멤버 정보',
      content: <ActivityInfoModal id={groupId} />,
    });
  };
  const handleMenubarItemClick = (mode: ActivityGroupStatusType) => {
    setMode(mode);
  };
  const handleApproveButtonClick = (
    id: number,
    status: ActivityGroupStatusType,
  ) => {
    activityGroupStatusMutate({
      activityGroupId: id,
      activityGroupStatus: status,
    });
  };
  const handleRejectButtonClick = (id: number) => {
    activityGroupDeleteMutate(id);
  };

  const renderMode = {
    WAITING: (
      <Table head={TABLE_HEAD.ACTIVITY_GROUP_DETAIL}>
        {groupData.items.map(({ leaders, name, subject, id }, index) => (
          <Table.Row key={id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{subject}</Table.Cell>
            <Table.Cell>{`${leaders[0].name} (${leaders[0].id})`}</Table.Cell>
            <Table.Cell className="space-x-2">
              <ActionButton
                color="blue"
                onClick={() => handleInfoButtonClick(id)}
              >
                정보
              </ActionButton>
              <ActionButton
                color="green"
                onClick={() =>
                  handleApproveButtonClick(id, ACTIVITY_STATE.PROGRESSING)
                }
              >
                승인
              </ActionButton>
              <ActionButton
                color="red"
                onClick={() => handleRejectButtonClick(id)}
              >
                거절
              </ActionButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
    ),
    PROGRESSING: (
      <Table head={TABLE_HEAD.ACTIVITY_GROUP_DETAIL}>
        {groupData.items.map(({ leaders, name, subject, id }, index) => (
          <Table.Row key={id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{subject}</Table.Cell>
            <Table.Cell>{`${leaders[0].name} (${leaders[0].id})`}</Table.Cell>
            <Table.Cell className="space-x-2">
              <ActionButton
                color="blue"
                onClick={() => handleInfoButtonClick(id)}
              >
                정보
              </ActionButton>
              <ActionButton
                color="red"
                onClick={() => handleRejectButtonClick(id)}
              >
                삭제
              </ActionButton>
              <ActionButton
                color="green"
                onClick={() => handleApproveButtonClick(id, ACTIVITY_STATE.END)}
              >
                종료
              </ActionButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
    ),
    END: (
      <Table head={TABLE_HEAD.ACTIVITY_GROUP_DETAIL}>
        {groupData.items.map(({ leaders, name, subject, id }, index) => (
          <Table.Row key={id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{subject}</Table.Cell>
            <Table.Cell>{`${leaders[0].name} (${leaders[0].id})`}</Table.Cell>
            <Table.Cell className="space-x-2">
              <ActionButton
                color="blue"
                onClick={() => handleInfoButtonClick(id)}
              >
                정보
              </ActionButton>
              <ActionButton
                color="red"
                onClick={() => handleRejectButtonClick(id)}
              >
                삭제
              </ActionButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
    ),
  }[mode];

  return (
    <Section>
      <Section.Header
        title="활동"
        description="활동 그룹 생성 내역을 확인할 수 있어요"
      >
        <Menubar>
          <Menubar.Item
            selected={mode === ACTIVITY_STATE.WAITING}
            onClick={() => handleMenubarItemClick(ACTIVITY_STATE.WAITING)}
          >
            신청
          </Menubar.Item>
          <Menubar.Item
            selected={mode === ACTIVITY_STATE.PROGRESSING}
            onClick={() => handleMenubarItemClick(ACTIVITY_STATE.PROGRESSING)}
          >
            진행중
          </Menubar.Item>
          <Menubar.Item
            selected={mode === ACTIVITY_STATE.END}
            onClick={() => handleMenubarItemClick(ACTIVITY_STATE.END)}
          >
            종료
          </Menubar.Item>
        </Menubar>
      </Section.Header>
      <Section.Body>
        {renderMode}
        <Pagination
          className="mt-4 justify-center"
          totalItems={groupData.totalItems}
          postLimit={size}
          onChange={handlePageChange}
          page={page}
        />
      </Section.Body>
    </Section>
  );
};

export default ManageActivitySection;
