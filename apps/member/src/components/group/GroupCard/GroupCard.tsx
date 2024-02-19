import classNames from 'classnames';
import { PATH_FINDER } from '@constants/path';
import { useNavigate } from 'react-router-dom';
import { LiaCertificateSolid } from 'react-icons/lia';
import { MdOutlineDateRange } from 'react-icons/md';
import Image from '@components/common/Image/Image';
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
  if (typeof value === 'number' && value === 0) return null;

  return (
    <div
      className={classNames(
        'items-center flex flex-col px-4 py-2 rounded text-center',
        colors[color],
      )}
    >
      <b>{value}</b>
      <p className="font-semibold text-xs text-nowrap break-keep">{title}</p>
    </div>
  );
};

const InfoRow = ({ label, children }: InfoRow) => {
  return (
    <div>
      <label className="font-bold">{label}</label>
      <p>{children}</p>
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
      className="flex cursor-pointer border rounded-lg"
      onClick={() =>
        navigate(PATH_FINDER.ACTIVITY_DETAIL(String(id)), {
          state: { category: category, id: id },
        })
      }
    >
      <Image
        src={imageUrl}
        width="w-1/3"
        height="h-[227px]"
        alt={name}
        className="rounded-l-lg object-cover border-r"
      />
      <div className="p-4 flex flex-col gap-2 w-2/3 divide-y">
        <div className="grow">
          <p className="font-bold text-lg">{name}</p>
          <p className="text-gray-600 text-sm">{content}</p>
        </div>
        <div className="grid md:grid-cols-2 md:divide-x pt-4 text-sm">
          <div className="pr-4 hidden md:block">
            <b>내용</b>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              <InfoCard
                title="주차"
                color="yellow"
                value={weeklyActivityCount}
              />
              <InfoCard title="인원" color="blue" value={participantCount} />
              <InfoCard title="대상" color="purple" value={subject} />
            </div>
          </div>
          <div className="md:pl-4 text-sm flex flex-col justify-between">
            <InfoRow label="팀장">{`${leaderName}(${leaderId})`}</InfoRow>
            <InfoRow label="정보">
              <div className="text-sm flex items-center text-gray-500">
                <LiaCertificateSolid className="mr-1" />
                <span>{category}</span>
                <span className="px-1">•</span>
                <MdOutlineDateRange className="mr-1" />
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
