import { useNavigate } from 'react-router-dom';

import { Grid } from '@clab-platforms/design-system';
import {
  CertificateSolidOutline,
  DateRangeOutline,
} from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

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
      <b className="text-nowrap break-keep">{value}</b>
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
  leaders,
  participantCount,
  weeklyActivityCount,
  createdAt,
}: GroupCardProps) => {
  const navigate = useNavigate();
  const leaderName = leaders[0].name;
  const leaderId = leaders[0].id;

  return (
    <Grid
      col="3"
      gap="sm"
      className="h-[227px] cursor-pointer overflow-auto rounded-lg border transition-colors hover:bg-gray-50"
      onClick={() => navigate(PATH_FINDER.ACTIVITY_DETAIL(id))}
    >
      <Image
        src={imageUrl}
        alt={name}
        height="min-h-fit h-full"
        className="rounded-l-lg border-r object-cover"
      />
      <div className="col-span-2 flex flex-col gap-2 divide-y p-4 ">
        <div className="h-full overflow-hidden text-ellipsis sm:h-24 ">
          <p className="truncate text-lg font-bold">{name}</p>
          <p className="line-clamp-4 text-sm text-gray-600 sm:line-clamp-3">
            {content}
          </p>
        </div>

        <div className="grid pt-2 text-sm md:grid-cols-2 md:divide-x">
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
    </Grid>
  );
};

export default GroupCard;
