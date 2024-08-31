import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Menubar } from '@clab-platforms/design-system';

import Content from '@components/common/Content/Content';
import EmptyBox from '@components/common/EmptyBox/EmptyBox';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import GroupCard from '@components/group/GroupCard/GroupCard';

import { MY_MESSAGE } from '@constants/message';
import { PATH } from '@constants/path';
import { ACTIVITY_MEMBER_STATE, ACTIVITY_STATE } from '@constants/state';
import {
  useActivityGroupMember,
  useActivityGroupMemberApplied,
  useMyActivityGroupMember,
} from '@hooks/queries';

import type { ActivityGroupItem } from '@type/activity';

const MenubarItems = [
  { name: '현재 진행중인 그룹', value: ACTIVITY_STATE.PROGRESSING },
  { name: '나의 활동', value: ACTIVITY_MEMBER_STATE.ACCEPTED },
  { name: '나의 지원', value: ACTIVITY_MEMBER_STATE.WAITING },
];
const SubMenubarItems = [
  { name: '진행중', value: ACTIVITY_STATE.PROGRESSING },
  { name: '종료', value: ACTIVITY_STATE.END },
];
const GroupPage = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(MenubarItems[0]);
  const [subMenu, setSubMenu] = useState(SubMenubarItems[0]);
  const { data: progressingData } = useActivityGroupMember();
  const { data: waitingData } = useActivityGroupMemberApplied();
  const { refetch: acceptedDataRefetch, data: acceptedData } =
    useMyActivityGroupMember({
      status: subMenu.value,
    });

  const [renderData, setRenderData] = useState<ActivityGroupItem[]>(
    progressingData.items,
  );

  useEffect(() => {
    switch (menu.value) {
      case ACTIVITY_STATE.PROGRESSING:
        setRenderData(progressingData.items);
        break;
      case ACTIVITY_MEMBER_STATE.ACCEPTED:
        setRenderData(acceptedData.items);
        break;
      case ACTIVITY_MEMBER_STATE.WAITING:
        setRenderData(waitingData.items);
        break;
    }
  }, [menu, progressingData, acceptedData, waitingData]);
  useEffect(() => {
    acceptedDataRefetch();
  }, [subMenu, acceptedDataRefetch]);

  return (
    <Content>
      <Header title="활동">
        <Button size="sm" onClick={() => navigate(PATH.ACTIVITY_APPLY)}>
          활동신청
        </Button>
        <Button
          size="sm"
          color="blue"
          onClick={() => navigate(PATH.ACTIVITY_CREATE)}
        >
          새로운 그룹 만들기
        </Button>
      </Header>
      <Section>
        <Section.Header title={`${menu.name} ${renderData.length}`}>
          <Menubar className="hidden sm:flex">
            {MenubarItems.map((item) => (
              <Menubar.Item
                selected={menu.value === item.value}
                key={item.value}
                onClick={() => setMenu(item)}
              >
                {item.name}
              </Menubar.Item>
            ))}
          </Menubar>
        </Section.Header>
        <Section.Body className="space-y-4">
          <>
            <Menubar className="flex sm:hidden">
              {MenubarItems.map((item) => (
                <Menubar.Item
                  selected={menu.value === item.value}
                  key={item.value}
                  onClick={() => setMenu(item)}
                >
                  {item.name}
                </Menubar.Item>
              ))}
            </Menubar>
            {menu === MenubarItems[1] && ( // 나의 활동 조회인 경우에만 subMenu 표시
              <Menubar className="text-sm">
                {SubMenubarItems.map((item) => (
                  <Menubar.Item
                    key={item.value}
                    selected={subMenu.value === item.value}
                    onClick={() => setSubMenu(item)}
                  >
                    {item.name}
                  </Menubar.Item>
                ))}
              </Menubar>
            )}
          </>
          {renderData.length > 0 ? (
            renderData.map(({ id, ...rest }) => (
              <GroupCard key={id} id={id} {...rest} />
            ))
          ) : (
            <EmptyBox>{MY_MESSAGE.NO_ACTIVITY}</EmptyBox>
          )}
        </Section.Body>
      </Section>
    </Content>
  );
};

export default GroupPage;
