import classNames from 'classnames';
import { useState } from 'react';
import GroupNoticeAlertSection from '../GroupNoticeAlertSection/GroupNoticeAlertSection';
import DropdownButton from '@components/common/DropdownButton/DropdownButton';
import dayjs from 'dayjs';
import type { ActivityBoardType } from '@type/activity';

interface GroupNoticeSectionProps {
  data: Array<ActivityBoardType>;
}

const GroupNoticeSection = ({ data }: GroupNoticeSectionProps) => {
  const [open, setOpen] = useState(false);

  const sortedNotices = data.sort(
    (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
  );

  const latestNotice = sortedNotices[0];
  const otherNotices = sortedNotices.slice(1);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col rounded-lg border bg-white p-4">
      <div className="flex items-center gap-2">
        <GroupNoticeAlertSection
          className="border-r pr-2"
          noticeId={latestNotice.id}
          title={latestNotice.title}
          date={latestNotice.createdAt || ''}
          latest={true}
        />
        {otherNotices.length > 0 && (
          <DropdownButton isOpen={open} onClick={() => setOpen(!open)} />
        )}
      </div>
      <div
        className={classNames(
          'overflow-hidden transition duration-500 ease-in-out',
          open ? 'opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <hr className="my-4" />
        <div className="flex flex-col gap-4">
          {otherNotices.map((notice) => (
            <GroupNoticeAlertSection
              key={notice.id}
              noticeId={notice.id}
              title={notice.title}
              date={notice.createdAt || ''}
              latest={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupNoticeSection;
