import { DetailsList } from '@clab-platforms/design-system';

import Image from '@components/common/Image/Image';

import { useMembers } from '@hooks/queries/useMembers';
import { createImageUrl } from '@utils/api';
import { formattedDate } from '@utils/date';

interface MemberInfoModalProps {
  id: string;
}

const MemberInfoModal = ({ id }: MemberInfoModalProps) => {
  const { data, isLoading } = useMembers({ id });

  if (isLoading) return null;

  const { imageUrl, name, grade, contact, email, createdAt } = data.items[0];

  return (
    <div className="space-y-2">
      <div className="scrollbar-hide max-h-[480px] overflow-auto rounded-lg border">
        <Image src={createImageUrl(imageUrl)} alt={name} />
      </div>
      <DetailsList>
        <DetailsList.Item label="이름(학번)">{`${name}(${id})`}</DetailsList.Item>
        <DetailsList.Item label="학년">{grade}</DetailsList.Item>
        <DetailsList.Item label="연락처">{contact}</DetailsList.Item>
        <DetailsList.Item label="이메일">{email}</DetailsList.Item>
        <DetailsList.Item label="계정 생성일">
          {formattedDate(createdAt)}
        </DetailsList.Item>
      </DetailsList>
    </div>
  );
};

export default MemberInfoModal;
