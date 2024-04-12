import ProfilePanel from '@components/panels/ProfilePanel/ProfilePanel';

import { useMyNotifications } from '@hooks/queries';
import { useMyActivity } from '@hooks/queries/useMyActivity';
import { useMyBookLoan } from '@hooks/queries/useMyBookLoan';
import { useMyProfile } from '@hooks/queries/useMyProfile';

import ActivityPanel from '../ActivityPanel/ActivityPanel';
import AlarmPanel from '../AlarmPanel/AlarmPanel';
import BookPanel from '../BookPanel/BookPanel';

const PanelAside = () => {
  const { data: myNotificationsData } = useMyNotifications();
  const { data: myActivities } = useMyActivity();
  const { data: myProfile } = useMyProfile();
  const { data: myBooksData } = useMyBookLoan(myProfile.id);

  return (
    <aside className="hidden w-1/4 space-y-4 xl:block">
      <ProfilePanel data={myProfile} />
      <AlarmPanel
        data={myNotificationsData.items}
        totalLength={myNotificationsData.totalItems}
      />
      <ActivityPanel data={myActivities.items} />
      <BookPanel data={myBooksData} memberId={myProfile.id} />
    </aside>
  );
};

export default PanelAside;
