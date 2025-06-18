import EmptyBox from '@components/common/EmptyBox/EmptyBox';
import ListButton from '@components/common/ListButton/ListButton';
import Section from '@components/common/Section/Section';
import MembershipStatusBadge from '@components/membership/membershipStatusBadge/MembershipStatusBadge';

import { MY_MESSAGE } from '@constants/message';
import { useMembershipInfoModal } from '@hooks/modal/useMembershipInfoModal';
import { useMembershipFee, useMyProfile } from '@hooks/queries';
import { toYYMMDD } from '@utils/date';

export function MembershipHistorySection() {
  const { open } = useMembershipInfoModal();
  const { data: myProfile } = useMyProfile();
  const { data: membershipFee } = useMembershipFee({
    memberId: myProfile.id,
    size: 10,
  });

  return (
    <Section>
      <Section.Header title="회비 신청 내역" />
      <Section.Body className="text-sm">
        {membershipFee.items.length === 0 ? (
          <EmptyBox>{MY_MESSAGE.NO_MEMBERSHIP}</EmptyBox>
        ) : (
          membershipFee.items.map((membership) => (
            <ListButton
              key={membership.id}
              onClick={() =>
                open({
                  data: membership,
                  isOwner: true, // 회비 신청 내역, 모든 정보가 보여지도록 설정
                })
              }
            >
              <p className="grow space-x-2 truncate pr-4">
                <MembershipStatusBadge status={membership.status} />
                <span>{membership.content}</span>
              </p>
              <p className="text-clab-main-light">
                {toYYMMDD(membership.createdAt)}
              </p>
            </ListButton>
          ))
        )}
      </Section.Body>
    </Section>
  );
}
