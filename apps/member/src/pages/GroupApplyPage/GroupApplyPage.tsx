import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import { Button } from '@clab/design-system';

import { ChangeEvent, useCallback, useState } from 'react';
import Select from '@components/common/Select/Select';
import { useActivityGroupMemberByStatus } from '@hooks/queries/useActivityGroupMemberByStatus';
import { useActivityGroupMemberApplyMutation } from '@hooks/queries/useActivityGroupMemberApplyMutation';
import useToast from '@hooks/common/useToast';
import Textarea from '@components/common/Textarea/Textarea';
import Label from '@components/common/Label/Label';

const GroupApplyPage = () => {
  const { data: groupData } = useActivityGroupMemberByStatus();
  const { activityGroupMemberMutate } = useActivityGroupMemberApplyMutation();
  const toast = useToast();

  const [groupID, setGroupID] = useState<number>(0);
  const [reason, setReason] = useState<string>('');

  const options = groupData.items.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const handleReason = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  }, []);

  const handleGroupID = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setGroupID(Number(e.target.value));
  }, []);

  const onClickApply = () => {
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
            onChange={handleGroupID}
          />
        </div>
        <div>
          <Label htmlFor="reason" required>
            지원서
          </Label>
          <Textarea
            id="reason"
            placeholder="지원동기를 입력해주세요."
            maxLength={1000}
            className="w-full resize-none h-80 scrollbar-hide"
            value={reason}
            onChange={handleReason}
          />
        </div>
        <Button className="w-full" onClick={onClickApply}>
          신청하기
        </Button>
      </Section>
    </Content>
  );
};
export default GroupApplyPage;
