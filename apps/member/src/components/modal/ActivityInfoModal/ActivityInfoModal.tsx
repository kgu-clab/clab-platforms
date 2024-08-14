import { DetailsList } from '@clab-platforms/design-system';

import Image from '@components/common/Image/Image';

import { useActivityGroup } from '@hooks/queries';
import { createImageUrl } from '@utils/api';

interface MemberInfoModalProps {
  id: number;
}

const ActivityInfoModal = ({ id }: MemberInfoModalProps) => {
  const { data, isLoading } = useActivityGroup(+id);

  if (isLoading) return null;

  const { imageUrl, name, content, category, subject, curriculum, techStack } =
    data;

  return (
    <div className="space-y-2">
      <div className="scrollbar-hide max-h-[480px] overflow-auto rounded-lg border">
        <Image src={createImageUrl(imageUrl)} alt={name} />
      </div>
      <DetailsList>
        <DetailsList.Item label="분류">{category}</DetailsList.Item>
        <DetailsList.Item label="이름">{name}</DetailsList.Item>
        <DetailsList.Item label="대상">{subject}</DetailsList.Item>
        <DetailsList.Item label="설명">{content}</DetailsList.Item>
        <DetailsList.Item label="커리큘럼">{curriculum}</DetailsList.Item>
        <DetailsList.Item label="기술스텍">{techStack}</DetailsList.Item>
      </DetailsList>
    </div>
  );
};

export default ActivityInfoModal;
