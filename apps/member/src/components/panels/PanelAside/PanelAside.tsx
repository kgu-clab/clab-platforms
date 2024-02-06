import AttendanceFairyPanel from '@components/panels/AttendanceFairyPanel/AttendanceFairyPanel';
import ProfilePanel from '@components/panels/ProfilePanel/ProfilePanel';
import AlarmPanel from '../AlarmPanel/AlarmPanel';
import ActivityPanel from '../ActivityPanel/ActivityPanel';
import BookPanel from '../BookPanel/BookPanel';
import AccountPanel from '../AccountPanel/AccountPanel';
import SetupPanel from '../SetupPanel/SetupPanel';
import { account } from '@mocks/mocks';
import { useMyNotifications } from '@hooks/queries';
import { useMyBookLoan } from '@hooks/queries/useMyBookLoan';
import { useMyActivity } from '@hooks/queries/useMyActivity';

const PanelAside = () => {
  const { data: myNotificationsData } = useMyNotifications();
  const { data: myBooksData } = useMyBookLoan();
  const { data: myActivities } = useMyActivity();

  return (
    <aside className="hidden xl:w-1/4 xl:block">
      {account.map(({ name, image, createAt }, index) => (
        <div key={index} className="space-y-4">
          <ProfilePanel name={name} image={image} createAt={createAt} />
          <AttendanceFairyPanel />
          <AlarmPanel data={myNotificationsData.items} />
          <ActivityPanel data={myActivities.items} />
          <BookPanel data={myBooksData} />
          <AccountPanel />
          <SetupPanel />
        </div>
      ))}
    </aside>
  );
};

export default PanelAside;
