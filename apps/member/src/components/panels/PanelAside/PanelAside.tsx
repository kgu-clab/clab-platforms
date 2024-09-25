import { Suspense } from 'react';

import ProfilePanel from '@components/panels/ProfilePanel/ProfilePanel';
import ShortcutPanel from '@components/panels/ShortcutPanel/ShortcutPanel';

import ActivityPanel from '../ActivityPanel/ActivityPanel';
import AlarmPanel from '../AlarmPanel/AlarmPanel';
import BookPanel from '../BookPanel/BookPanel';

const PanelAside = () => {
  return (
    <aside className="hidden w-1/4 space-y-4 xl:block">
      <Suspense>
        <ProfilePanel />
      </Suspense>
      <Suspense>
        <AlarmPanel />
      </Suspense>
      <Suspense>
        <ActivityPanel />
      </Suspense>
      <Suspense>
        <BookPanel />
      </Suspense>
      <ShortcutPanel />
    </aside>
  );
};

export default PanelAside;
