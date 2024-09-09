import { DetailsList } from '@clab-platforms/design-system';

import Image from '@components/common/Image/Image';

import { useActivityGroup } from '@hooks/queries';
import { createImageUrl } from '@utils/api';

interface MemberInfoModalProps {
  id: number;
}
interface LongTextItemProps {
  label: string;
  text?: string;
}

const LongTextItem = ({ label, text }: LongTextItemProps) => {
  return (
    <li className="flex justify-between gap-4">
      <span>{label}</span>
      <span className="text-right font-semibold">{text || '-'}</span>
    </li>
  );
};

const ActivityInfoModal = ({ id }: MemberInfoModalProps) => {
  const { data, isLoading } = useActivityGroup(+id);

  if (isLoading) return null;

  const { imageUrl, name, content, category, subject, curriculum, techStack } =
    data;

  return (
    <div className="space-y-2 overflow-auto ">
      <div className="scrollbar-hide max-h-[480px] overflow-auto rounded-lg border">
        <Image
          src={createImageUrl(imageUrl)}
          alt={name}
          height="max-h-[30vh]"
          className="object-cover"
        />
      </div>
      <DetailsList className="h-full max-h-[50vh] overflow-scroll">
        <DetailsList.Item label="분류">{category}</DetailsList.Item>
        <DetailsList.Item label="이름">{name}</DetailsList.Item>
        <DetailsList.Item label="대상">{subject}</DetailsList.Item>
        <LongTextItem label="설명" text={content} />
        <LongTextItem label="커리큘럼" text={curriculum} />
        <DetailsList.Item label="기술스텍">{techStack || '-'}</DetailsList.Item>
      </DetailsList>
    </div>
  );
};

export default ActivityInfoModal;
