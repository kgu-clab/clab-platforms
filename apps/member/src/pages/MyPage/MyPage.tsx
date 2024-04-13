import { Grid } from '@clab/design-system';

import Content from '@components/common/Content/Content';
import MyActivityGroupSection from '@components/my/MyActivityGroupSection/MyActivityGroupSection';
import MyHistorySection from '@components/my/MyHistorySection/MyHistorySection';
import MyMembershipHistorySection from '@components/my/MyMembershipHistorySection/MyMembershipHistorySection';
import MyProfileSection from '@components/my/MyProfileSection/MyProfileSection';

import {
  useActivityGroupMemberMy,
  useMembershipFee,
  useMyBoards,
  useMyComments,
  useMyNotifications,
} from '@hooks/queries';
import { useBookLoanRecordConditions } from '@hooks/queries/useBookLoanRecordConditions';
import { useMyProfile } from '@hooks/queries/useMyProfile';

const MyPage = () => {
  const { data: myProfile } = useMyProfile();
  const { data: myNotificationsData } = useMyNotifications(0, 10);
  const { data: myBoardsData } = useMyBoards(0, 10);
  const { data: myCommentsData } = useMyComments(0, 10);
  const { data: myMembershipFee } = useMembershipFee({
    memberId: myProfile.id,
    size: 10,
  });
  const { data: myBookLoanRecord } = useBookLoanRecordConditions({
    borrowerId: myProfile.id,
    size: 10,
  });
  const { data: myActivityGroup } = useActivityGroupMemberMy(0, 10);

  return (
    <Content>
      <MyProfileSection data={myProfile} />
      <MyHistorySection title="지난 알림" data={myNotificationsData.items} />
      <Grid col={2} gap="md">
        <MyMembershipHistorySection data={myMembershipFee.items} />
        <MyHistorySection
          title="도서 대출 내역"
          data={myBookLoanRecord.items}
        />
      </Grid>
      <MyActivityGroupSection data={myActivityGroup.items} />
      <Grid col={2} gap="md">
        <MyHistorySection title="나의 게시글" data={myBoardsData.items} />
        <MyHistorySection title="나의 댓글" data={myCommentsData.items} />
      </Grid>
    </Content>
  );
};

export default MyPage;
