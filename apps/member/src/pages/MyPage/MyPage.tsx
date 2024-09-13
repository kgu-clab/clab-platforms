import { Grid } from '@clab-platforms/design-system';

import Content from '@components/common/Content/Content';
import MyActivityGroupSection from '@components/my/MyActivityGroupSection/MyActivityGroupSection';
import MyHistorySection from '@components/my/MyHistorySection/MyHistorySection';
import MyMembershipHistorySection from '@components/my/MyMembershipHistorySection/MyMembershipHistorySection';
import MyProfileSection from '@components/my/MyProfileSection/MyProfileSection';

import {
  useBookLoanRecordConditions,
  useMembershipFee,
  useMyBoards,
  useMyComments,
  useMyNotifications,
  useMyProfile,
} from '@hooks/queries';

const MyPage = () => {
  const { data: myProfile } = useMyProfile();
  const { data: myNotificationsData } = useMyNotifications();
  const { data: myBoardsData } = useMyBoards();
  const { data: myCommentsData } = useMyComments();
  const { data: myMembershipFee } = useMembershipFee({
    memberId: myProfile.id,
    size: 10,
  });
  const { data: myBookLoanRecord } = useBookLoanRecordConditions({
    borrowerId: myProfile.id,
    size: 10,
  });

  return (
    <Content>
      <MyProfileSection data={myProfile} />
      <MyHistorySection title="지난 알림" data={myNotificationsData.items} />
      <Grid gap="md" className="md:grid-cols-2">
        <MyMembershipHistorySection data={myMembershipFee.items} />
        <MyHistorySection
          title="도서 대출 내역"
          data={myBookLoanRecord.items}
        />
      </Grid>
      <MyActivityGroupSection />
      <Grid gap="md" className="md:grid-cols-2">
        <MyHistorySection title="나의 게시글" data={myBoardsData.items} />
        <MyHistorySection title="나의 댓글" data={myCommentsData.items} />
      </Grid>
    </Content>
  );
};

export default MyPage;
