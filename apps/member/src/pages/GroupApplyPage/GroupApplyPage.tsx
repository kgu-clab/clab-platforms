import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@clab-platforms/design-system';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Label from '@components/common/Label/Label';
import Section from '@components/common/Section/Section';
import Select from '@components/common/Select/Select';
import TextCounting from '@components/common/TextCounting/TextCounting';
import Textarea from '@components/common/Textarea/Textarea';

import { PATH } from '@constants/path';
import { ACTIVITY_GROUP_CONTENT_MAX_LENGTH } from '@constants/state';
import { useToast } from '@hooks/common/useToast';
import {
  useActivityGroupMember,
  useActivityGroupMemberMutation,
} from '@hooks/queries';
import { toKoreaActivityGroupCategory } from '@utils/string';

const GroupApplyPage = () => {
  const navigate = useNavigate();
  const { data: groupData } = useActivityGroupMember();
  const { activityGroupMemberMutate, activityGroupMemberIsPending } =
    useActivityGroupMemberMutation();
  const { addToast } = useToast();

  const [groupID, setGroupID] = useState<number | string>('none');
  const [reason, setReason] = useState('');
  const options = groupData.items.map((item) => ({
    name: `${toKoreaActivityGroupCategory(item.category)} / ${item.name} / ${item.leaders[0].name}`,
    value: item.id,
  }));

  const handleGroupIDChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupID(+e.target.value);
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleApplyButtonClick = () => {
    if (typeof groupID !== 'number' || reason.length === 0) {
      return addToast({
        state: 'error',
        message: '필수 입력 사항을 모두 입력해주세요.',
      });
    } else if (reason.length > ACTIVITY_GROUP_CONTENT_MAX_LENGTH) {
      return addToast({
        state: 'error',
        message: `지원 동기는 ${ACTIVITY_GROUP_CONTENT_MAX_LENGTH}자 이내로 작성해주세요.`,
      });
    }

    activityGroupMemberMutate(
      {
        activityGroupId: +groupID,
        body: {
          applyReason: reason,
        },
      },
      { onSuccess: () => navigate(PATH.ACTIVITY) },
    );
  };

  return (
    <Content>
      <Header title={['활동', '활동 신청']} path={PATH.ACTIVITY} />
      <Section className="space-y-4">
        <div>
          <Label htmlFor="select" required>
            활동
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
            지원 동기
          </Label>
          <Textarea
            id="reason"
            placeholder="지원동기를 입력해주세요."
            className="scrollbar-hide h-80 w-full resize-none"
            value={reason}
            onChange={handleReasonChange}
          />
          <TextCounting
            maxLength={ACTIVITY_GROUP_CONTENT_MAX_LENGTH}
            text={reason}
          />
        </div>
        <Button
          className="w-full"
          onClick={handleApplyButtonClick}
          disabled={activityGroupMemberIsPending}
        >
          신청하기
        </Button>
      </Section>
    </Content>
  );
};
export default GroupApplyPage;
