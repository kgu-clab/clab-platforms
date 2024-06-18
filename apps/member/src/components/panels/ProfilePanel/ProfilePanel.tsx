import { getRandomNumber } from '@clab/utils';

import Avatar from '@components/common/Avatar/Avatar';
import Panel from '@components/common/Panel/Panel';

import { useMyProfile } from '@hooks/queries';
import { calculateDDay } from '@utils/date';

const TIPS = [
  '오늘은 맛집 게시글을 작성하는건 어때요?',
  '오늘은 어떤 책을 읽으셨나요?',
  '오늘은 어떤 활동을 하셨나요?',
  '후배들을 위한 조언을 남겨보세요!',
  '오늘은 어떤 일을 하셨나요?',
  '학교 주변 맛집을 추천해주세요!',
] as const;

const ProfilePanel = () => {
  const { data } = useMyProfile();
  const { name, imageUrl, roleLevel, createdAt } = data;

  return (
    <Panel>
      <Panel.Body>
        <div className="flex gap-4">
          <div className="p-1">
            <Avatar src={imageUrl} roleLevel={roleLevel} />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-lg font-bold">반가워요! {name}님</p>
            <p className="text-sm font-semibold">
              C-Lab과 함께한 지 {calculateDDay(createdAt)}일 ❤️
            </p>
          </div>
        </div>
        <p className="mt-4 rounded-md bg-gray-100 py-1 text-center text-xs font-semibold">
          &quot;{TIPS[getRandomNumber(TIPS.length - 1)]}&quot;
        </p>
      </Panel.Body>
    </Panel>
  );
};

export default ProfilePanel;
