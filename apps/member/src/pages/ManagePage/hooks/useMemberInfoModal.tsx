import { useMemo } from 'react';

import { DetailsList } from '@clab-platforms/design-system';

import Image from '@components/common/Image/Image';

import { UseModalResult, useModal } from '@hooks/common/useModal';
import { useMembers } from '@hooks/queries/useMembers';
import { createImageUrl } from '@utils/api';
import { formattedDate } from '@utils/date';

interface Options {
  memberId: string;
}

/**
 * 멤버 정보 모달을 엽니다.
 */
export function useMemberInfoModal(): UseModalResult<Options> {
  const { open } = useModal();

  return useMemo(
    () => ({
      open: (options: Options) =>
        open({
          title: '멤버 정보',
          content: <MemberInfoModal {...options} />,
        }),
    }),
    [open],
  );
}

interface Props extends Options {}

function MemberInfoModal({ memberId }: Props) {
  const { data } = useMembers({ id: memberId });

  const { imageUrl, name, grade, contact, email, createdAt } = data.items[0];

  return (
    <div className="space-y-2">
      <div className="scrollbar-hide max-h-[480px] overflow-auto rounded-lg border">
        <Image src={createImageUrl(imageUrl)} alt={name} />
      </div>
      <DetailsList>
        <DetailsList.Item label="이름 (학번)">{`${name} (${memberId})`}</DetailsList.Item>
        <DetailsList.Item label="학년">{grade}</DetailsList.Item>
        <DetailsList.Item label="연락처">{contact}</DetailsList.Item>
        <DetailsList.Item label="이메일">{email}</DetailsList.Item>
        <DetailsList.Item label="계정 생성일">
          {formattedDate(createdAt)}
        </DetailsList.Item>
      </DetailsList>
    </div>
  );
}
