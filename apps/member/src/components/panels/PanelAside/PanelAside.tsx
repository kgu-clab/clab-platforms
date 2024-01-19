import AttendanceFairyPanel from '@components/panels/AttendanceFairyPanel/AttendanceFairyPanel';
import ProfilePanel from '@components/panels/ProfilePanel/ProfilePanel';
import AlarmPanel from '../AlarmPanel/AlarmPanel';
import ActivityPanel from '../ActivityPanel/ActivityPanel';
import BookPanel from '../BookPanel/BookPanel';
import AccountPanel from '../AccountPanel/AccountPanel';
import SetupPanel from '../SetupPanel/SetupPanel';
import { account } from '@mocks/mocks';

const PanelAside = () => {
  return (
    <aside className="hidden xl:w-1/4 xl:block">
      {account.map(
        ({ name, image, createAt, alerts, activity, books }, index) => (
          <div key={index} className="space-y-4">
            <ProfilePanel name={name} image={image} createAt={createAt} />
            <AttendanceFairyPanel />
            <AlarmPanel data={alerts} />
            <ActivityPanel data={activity} />
            <BookPanel data={books} />
            <AccountPanel />
            <SetupPanel />
          </div>
        ),
      )}
    </aside>
  );
};

export default PanelAside;
