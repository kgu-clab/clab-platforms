/* eslint-disable react/display-name */
import { useState } from 'react';

import { cn } from '@clab-platforms/utils';

import DropdownButton from '@components/common/DropdownButton/DropdownButton';
import Section from '@components/common/Section/Section';

import { useModal } from '@hooks/common/useModal';
import { formattedDate, toKoreaISOString } from '@utils/date';
import dayjs from 'dayjs';

import type { ActivityBoardType } from '@type/activity';
import type { ResponseFile } from '@type/api';

import { ActivityNoticeModal } from './ActivityNoticeModal';

interface Props {
  data: Array<ActivityBoardType>;
}

interface ItemProps {
  className?: string;
  onClick: (
    content: string,
    title?: string,
    files?: Array<ResponseFile>,
  ) => void;
  data: ActivityBoardType;
}

const ActivityNoticeSection = ({ data }: Props) => {
  const { open: openModal } = useModal();
  const [open, setOpen] = useState(false);

  if (!data || data.length === 0) {
    return null;
  }

  const sortedNotices = data.sort(
    (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
  );

  const latestNotice = sortedNotices[0];
  const otherNotices = sortedNotices.slice(1);

  const handleNoticeClick = (
    content: string,
    title?: string,
    files?: Array<ResponseFile>,
  ) => {
    openModal({
      title: `📣 ${title}`,
      content: <ActivityNoticeModal content={content} files={files} />,
    });
  };

  return (
    <Section className="!p-2">
      <div className="flex items-center gap-2 divide-x">
        <ActivityNoticeSection.Item
          data={latestNotice}
          onClick={handleNoticeClick}
        />
        {otherNotices.length > 0 && (
          <DropdownButton
            isOpen={open}
            onClick={() => setOpen(!open)}
            className="pl-2"
          />
        )}
      </div>
      <div
        className={cn(
          'overflow-hidden transition duration-500 ease-in-out',
          open ? 'opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <hr className="my-2" />
        <div className="flex flex-col">
          {otherNotices.map((notice) => (
            <ActivityNoticeSection.Item
              key={notice.id}
              data={notice}
              onClick={handleNoticeClick}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

ActivityNoticeSection.Item = ({ className, data, onClick }: ItemProps) => {
  return (
    <div
      className={cn(
        'w-full rounded-lg p-2 transition-colors duration-300 ease-in-out hover:bg-gray-100',
        className,
      )}
    >
      <div
        className="flex cursor-pointer items-center justify-between gap-2"
        onClick={() => onClick(data.content, data.title, data.files)}
      >
        <p className="w-full truncate">{data.title}</p>
        <p className="whitespace-nowrap text-sm text-gray-500">
          {formattedDate(
            data.updatedAt ? toKoreaISOString(data.updatedAt) : String(dayjs()),
          )}
        </p>
      </div>
    </div>
  );
};

export default ActivityNoticeSection;
