import DropdownButton from '@components/common/DropdownButton/DropdownButton';
import useModal from '@hooks/common/useModal';
import Section from '@components/common/Section/Section';
import type { ActivityBoardType } from '@type/activity';
import { formattedDate } from '@utils/date';
import classNames from 'classnames';
import { useState } from 'react';
import dayjs from 'dayjs';

interface ActivityNoticeSectionProps {
  data: Array<ActivityBoardType>;
}

interface ActivityNoticeSectionItemProps {
  className?: string;
  onClick: (content: string) => void;
  data: ActivityBoardType;
}

const ActivityNoticeSection = ({ data }: ActivityNoticeSectionProps) => {
  const { openModal } = useModal();
  const [open, setOpen] = useState(false);

  if (!data || data.length === 0) {
    return null;
  }

  const sortedNotices = data.sort(
    (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
  );

  const latestNotice = sortedNotices[0];
  const otherNotices = sortedNotices.slice(1);

  const onClickAlert = (content: string) => {
    openModal({
      title: '📣 공지사항',
      content: content,
    });
  };

  return (
    <Section className="!p-2">
      <div className="flex items-center gap-2 divide-x">
        <ActivityNoticeSection.Item
          data={latestNotice}
          onClick={onClickAlert}
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
        className={classNames(
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
              onClick={onClickAlert}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

ActivityNoticeSection.Item = ({
  className,
  data,
  onClick,
}: ActivityNoticeSectionItemProps) => {
  return (
    <div
      className={classNames(
        'w-full hover:bg-gray-100 p-2 rounded-lg transition-colors duration-300 ease-in-out',
        className,
      )}
    >
      <div
        className="flex items-center justify-between gap-2 cursor-pointer"
        onClick={() => onClick(data.content)}
      >
        <p className="w-full truncate">{data.title}</p>
        <p className="text-sm text-gray-500 whitespace-nowrap">
          {formattedDate(data.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ActivityNoticeSection;
