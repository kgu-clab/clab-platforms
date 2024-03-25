import ProfilePanel from '@components/panels/ProfilePanel/ProfilePanel';
import AlarmPanel from '../AlarmPanel/AlarmPanel';
import ActivityPanel from '../ActivityPanel/ActivityPanel';
import BookPanel from '../BookPanel/BookPanel';
import { useMyNotifications } from '@hooks/queries';
import { useMyBookLoan } from '@hooks/queries/useMyBookLoan';
import { useMyActivity } from '@hooks/queries/useMyActivity';
import { useMyProfile } from '@hooks/queries/useMyProfile';

const PanelAside = () => {
  const { data: myNotificationsData } = useMyNotifications();
  const { data: myActivities } = useMyActivity();
  const { data: myProfile } = useMyProfile();
  const { data: myBooksData } = useMyBookLoan(myProfile.id);

  return (
    <aside className="hidden xl:w-1/4 xl:block">
      <div className="space-y-4">
        <ProfilePanel data={myProfile} />
        <AlarmPanel
          data={myNotificationsData.items}
          totalLength={myNotificationsData.totalItems}
        />
        <ActivityPanel data={myActivities.items} />
        <BookPanel data={myBooksData} memberId={myProfile.id} />
      </div>
    </aside>
  );
};

export default PanelAside;
