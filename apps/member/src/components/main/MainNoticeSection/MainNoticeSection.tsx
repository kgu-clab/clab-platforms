import { useState } from 'react';

import { cn } from '@clab-platforms/utils';

import DropdownButton from '@components/common/DropdownButton/DropdownButton';
import Notice from '@components/common/Notice/Notice';
import Section from '@components/common/Section/Section';

import { DATE_FORMAT } from '@constants/state';
import { useSchedule } from '@hooks/queries';
import { now } from '@utils/date';

const MainNoticeSection = () => {
  const { data } = useSchedule({
    startDate: now().format(DATE_FORMAT.WITH_TIME),
  });

  const [open, setOpen] = useState(false);
  /**
   * 일정이 없을 경우 렌더링하지 않습니다.
   */
  if (data.items.length === 0) {
    return null;
  }

  const closestNotice = data.items[0];

  return (
    <Section>
      <div className="flex w-full items-center gap-2 divide-x">
        <Notice
          title={closestNotice.title}
          content={closestNotice.detail}
          date={closestNotice.startDateTime}
          showDDay
        />
        {data.items.length > 1 && (
          <DropdownButton
            className="pl-2"
            isOpen={open}
            onClick={() => setOpen((prev) => !prev)}
          />
        )}
      </div>
      <div
        className={cn(
          'overflow-hidden transition duration-500 ease-in-out',
          open ? 'opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <hr className="my-4" />
        <div className="flex flex-col gap-4">
          {data.items.slice(1).map(({ id, title, detail, startDateTime }) => (
            <Notice
              key={id}
              title={title}
              content={detail}
              date={startDateTime}
              showDDay
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default MainNoticeSection;
