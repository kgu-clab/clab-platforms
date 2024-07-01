import { useNavigate } from 'react-router-dom';

import { CertificateSolidOutline, DateRangeOutline } from '@clab/icon';
import { cn } from '@clab/utils';

import Image from '@components/common/Image/Image';

import { PATH_FINDER } from '@constants/path';
import { getDateSemester } from '@utils/date';

import type { ActivityGroupItem } from '@type/activity';

interface GroupCardProps extends ActivityGroupItem {}

interface InfoCardProps {
  title: string;
  value: string | number;
  color: 'yellow' | 'blue' | 'purple';
}

interface InfoRow {
  label: string;
  children: React.ReactNode;
}

const colors = {
  yellow: 'bg-yellow-100 text-yellow-500',
  blue: 'bg-blue-100 text-blue-500',
  purple: 'bg-purple-100 text-purple-500',
};

const InfoCard = ({ title, value, color }: InfoCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded px-4 py-2 text-center',
        colors[color],
      )}
    >
      <b className='break-keep" text-nowrap'>{value}</b>
      <p className="text-xs font-semibold">{title}</p>
    </div>
  );
};

const InfoRow = ({ label, children }: InfoRow) => {
  return (
    <div>
      <label className="font-bold">{label}</label>
      <div>{children}</div>
    </div>
  );
};

const GroupCard = ({
  id,
  name,
  content,
  category,
  subject,
  imageUrl,
  leaderId,
  leaderName,
  participantCount,
  weeklyActivityCount,
  createdAt,
}: GroupCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-[227px] cursor-pointer rounded-lg border transition-colors hover:bg-gray-50"
      onClick={() => navigate(PATH_FINDER.ACTIVITY_DETAIL(id))}
    >
      <Image
        src={imageUrl}
        width="w-1/3"
        alt={name}
        className="rounded-l-lg border-r object-cover"
      />
      <div className="flex w-2/3 flex-col gap-2 divide-y p-4">
        <div className="h-full">
          <p className="text-lg font-bold">{name}</p>
          <p className="text-sm text-gray-600">{content}</p>
        </div>
        <div className="grid pt-4 text-sm md:grid-cols-2 md:divide-x">
          <div className="hidden pr-4 md:block">
            <b>내용</b>
            <div className="mt-2 grid grid-cols-3 gap-4">
              <InfoCard
                title="주차"
                color="yellow"
                value={weeklyActivityCount}
              />
              <InfoCard title="인원" color="blue" value={participantCount} />
              <InfoCard title="대상" color="purple" value={subject} />
            </div>
          </div>
          <div className="flex flex-col justify-between text-sm md:pl-4">
            <InfoRow label="팀장">{`${leaderName}(${leaderId})`}</InfoRow>
            <InfoRow label="정보">
              <div className="flex items-center text-sm text-gray-500">
                <CertificateSolidOutline className="mr-1" />
                <span>{category}</span>
                <span className="px-1">•</span>
                <DateRangeOutline className="mr-1" />
                <span>{getDateSemester(createdAt)}</span>
              </div>
            </InfoRow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
