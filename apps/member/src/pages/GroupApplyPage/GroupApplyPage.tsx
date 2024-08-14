import { useEffect, useState } from 'react';

import { Button } from '@clab-platforms/design-system';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Label from '@components/common/Label/Label';
import Section from '@components/common/Section/Section';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';

import { BOARD_CONTENT_MAX_LENGTH } from '@constants/state';
import useToast from '@hooks/common/useToast';
import {
  useActivityGroupMember,
  useActivityGroupMemberMutation,
} from '@hooks/queries';

const GroupApplyPage = () => {
  const { data: groupData } = useActivityGroupMember();
  const { activityGroupMemberMutate } = useActivityGroupMemberMutation();
  const toast = useToast();

  const [groupID, setGroupID] = useState(0);
  const [reason, setReason] = useState('');

  const options = groupData.items.map((item) => ({
    name: item.name,
    value: item.id,
  }));

  const handleGroupIDChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupID(+e.target.value);
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleApplyButtonClick = () => {
    if (groupID === 0 || reason.length === 0) {
      return toast({
        state: 'error',
        message: '필수 입력 사항을 모두 입력해주세요.',
      });
    }

    activityGroupMemberMutate({
      activityGroupId: groupID,
      body: {
        applyReason: reason,
      },
    });
  };

  useEffect(() => {
    if (groupData.items.length === 1 && groupData.items[0].id)
      setGroupID(groupData.items[0].id);
  }, [groupData.items]);

  return (
    <Content>
      <Header title={['활동', '활동 신청']} />
      <Section className="space-y-4">
        <div>
          <Label htmlFor="select" required>
            이름
          </Label>
          <Select
            id="select"
            className="w-full"
            options={options}
            value={groupID}
            onChange={handleGroupIDChange}
          />
        </div>
        <div>
          <Label htmlFor="reason" required>
            지원서
          </Label>
          <Textarea
            id="reason"
            placeholder="지원동기를 입력해주세요."
            maxLength={BOARD_CONTENT_MAX_LENGTH}
            className="scrollbar-hide h-80 w-full resize-none"
            value={reason}
            onChange={handleReasonChange}
          />
        </div>
        <Button className="w-full" onClick={handleApplyButtonClick}>
          신청하기
        </Button>
      </Section>
    </Content>
  );
};
export default GroupApplyPage;
