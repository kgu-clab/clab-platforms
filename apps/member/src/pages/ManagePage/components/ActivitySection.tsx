import { Menubar, Table } from '@clab-platforms/design-system';

import ActionButton from '@components/common/ActionButton/ActionButton';
import EmptyBox from '@components/common/EmptyBox/EmptyBox';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { GROUP_MESSAGE } from '@constants/message';
import { ACTIVITY_STATE } from '@constants/state';
import { usePagination } from '@hooks/common/usePagination';
import { useView } from '@hooks/common/useView';
import { useActivityGroupMember } from '@hooks/queries';

import type { ActivityGroupStatusType } from '@type/activity';

import { useActivityGroupConfirmModal } from '../hooks/useActivityGroupConfirmModal';
import { useActivityGroupDeleteMutation } from '../hooks/useActivityGroupDeleteMutation';
import { useActivityGroupInfoModal } from '../hooks/useActivityGroupInfoModal';
import { useActivityGroupStatusMutation } from '../hooks/useActivityGroupStatusMutation';

export function ActivitySection() {
  const { open: openActivityGroupInfoModal } = useActivityGroupInfoModal();
  const { open: openActivityGroupConfirmModal } =
    useActivityGroupConfirmModal();
  const { view, handleViewClick } = useView<ActivityGroupStatusType>(
    ACTIVITY_STATE.WAITING,
  );
  const { page, size, handlePageChange } = usePagination({
    defaultSize: 6,
    sectionName: 'activity',
  });
  const { activityGroupDeleteMutate } = useActivityGroupDeleteMutation();
  const { activityGroupStatusMutate } = useActivityGroupStatusMutation();
  const { data: groupData } = useActivityGroupMember({
    status: view,
    page,
    size,
  });

  const handleInfoButtonClick = (groupId: number) => {
    return openActivityGroupInfoModal({ groupId });
  };

  const handleApproveButtonClick = (
    id: number,
    status: ActivityGroupStatusType,
  ) => {
    openActivityGroupConfirmModal({
      title: '활동',
      content: '해당 활동을 승인하시겠습니까?',
      onClick: () => {
        activityGroupStatusMutate({
          activityGroupId: id,
          activityGroupStatus: status,
        });
      },
    });
  };

  const handleRejectButtonClick = (id: number) => {
    openActivityGroupConfirmModal({
      title: '활동',
      content: '해당 활동을 종료하시겠습니까?',
      onClick: () => {
        activityGroupDeleteMutate(id);
      },
    });
  };

  const renderMode = {
    WAITING: (
      <Table head={TABLE_HEAD.ACTIVITY_GROUP_DETAIL}>
        {groupData.items.length ? (
          groupData.items.map(({ leaders, name, subject, id }, index) => (
            <Table.Row key={id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{subject}</Table.Cell>
              <Table.Cell>
                {leaders ? `${leaders[0].name} (${leaders[0].id})` : '-'}
              </Table.Cell>
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
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={TABLE_HEAD.ACTIVITY_GROUP_DETAIL.length}>
              <EmptyBox>{GROUP_MESSAGE.NO_WAITING_ACTIVITY}</EmptyBox>
            </Table.Cell>
          </Table.Row>
        )}
      </Table>
    ),
    PROGRESSING: (
      <Table head={TABLE_HEAD.ACTIVITY_GROUP_DETAIL}>
        {groupData.items.length ? (
          groupData.items.map(({ leaders, name, subject, id }, index) => (
            <Table.Row key={id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{subject}</Table.Cell>
              <Table.Cell>
                {leaders ? `${leaders[0].name} (${leaders[0].id})` : '-'}
              </Table.Cell>
              <Table.Cell className="space-x-2">
                <ActionButton onClick={() => handleInfoButtonClick(id)}>
                  정보
                </ActionButton>
                <ActionButton onClick={() => handleRejectButtonClick(id)}>
                  승인
                </ActionButton>
                <ActionButton
                  color="red"
                  onClick={() =>
                    handleApproveButtonClick(id, ACTIVITY_STATE.END)
                  }
                >
                  거절
                </ActionButton>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={TABLE_HEAD.ACTIVITY_GROUP_DETAIL.length}>
              <EmptyBox>{GROUP_MESSAGE.NO_PROGRESSING_ACTIVITY}</EmptyBox>
            </Table.Cell>
          </Table.Row>
        )}
      </Table>
    ),
    END: (
      <Table head={TABLE_HEAD.ACTIVITY_GROUP_DETAIL}>
        {groupData.items.length ? (
          groupData.items.map(({ leaders, name, subject, id }, index) => (
            <Table.Row key={id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{subject}</Table.Cell>
              <Table.Cell>
                {leaders ? `${leaders[0].name} (${leaders[0].id})` : '-'}
              </Table.Cell>
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
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={TABLE_HEAD.ACTIVITY_GROUP_DETAIL.length}>
              <EmptyBox>{GROUP_MESSAGE.NO_END_ACTIVITY}</EmptyBox>
            </Table.Cell>
          </Table.Row>
        )}
      </Table>
    ),
  }[view];

  return (
    <Section>
      <Section.Header
        title="활동"
        description="활동 그룹 생성 내역을 확인할 수 있어요"
      >
        <Menubar>
          <Menubar.Item
            selected={view === ACTIVITY_STATE.WAITING}
            onClick={() => handleViewClick(ACTIVITY_STATE.WAITING)}
          >
            신청
          </Menubar.Item>
          <Menubar.Item
            selected={view === ACTIVITY_STATE.PROGRESSING}
            onClick={() => handleViewClick(ACTIVITY_STATE.PROGRESSING)}
          >
            진행중
          </Menubar.Item>
          <Menubar.Item
            selected={view === ACTIVITY_STATE.END}
            onClick={() => handleViewClick(ACTIVITY_STATE.END)}
          >
            종료
          </Menubar.Item>
        </Menubar>
      </Section.Header>
      <Section.Body>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px]">{renderMode}</div>
        </div>
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
}
