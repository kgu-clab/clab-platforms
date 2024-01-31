import classNames from 'classnames';
import { PATH_FINDER } from '@constants/path';
import { useNavigate } from 'react-router-dom';
import { LiaCertificateSolid } from 'react-icons/lia';
import { MdOutlineDateRange } from 'react-icons/md';
import Image from '@components/common/Image/Image';

interface InfoCardProps {
  title: string;
  value: string | number;
  color: string;
}

interface GroupCardProps {
  id: number;
  image: string;
  name: string;
  manager: string;
  members: object[];
  description: string;
  category: string;
  weeklyActivities: object[];
}

const InfoCard = ({ title, value, color }: InfoCardProps) => {
  const colorClass = {
    yellow: 'bg-yellow-100 text-yellow-500',
    blue: 'bg-blue-100 text-blue-500',
    purple: 'bg-purple-100 text-purple-500',
  }[color];

  return (
    <div
      className={classNames(
        'items-center flex flex-col px-4 py-2 rounded',
        colorClass,
      )}
    >
      <b>{value || 0}</b>
      <p className="font-semibold text-xs">{title}</p>
    </div>
  );
};

const GroupCard = ({
  id,
  image,
  name,
  manager,
  members,
  description,
  category,
  weeklyActivities,
}: GroupCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex cursor-pointer border rounded-lg"
      onClick={() => navigate(PATH_FINDER.ACTIVITY_DETAIL(id))}
    >
      <Image
        src={image}
        width="w-1/3"
        height="h-[227px]"
        alt={name}
        className="rounded-l-lg object-cover border-r"
      />
      <div className="p-4 flex flex-col gap-2 w-2/3 divide-y">
        <div className="grow">
          <p className="font-bold text-lg">{name}</p>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div className="grid md:grid-cols-2 md:divide-x pt-4 text-sm">
          <div className="pr-4 hidden md:block">
            <b>내용</b>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <InfoCard
                title="주차"
                color="yellow"
                value={weeklyActivities?.length || 0}
              />
              <InfoCard
                title="인원"
                color="blue"
                value={members?.length || 1}
              />
              <InfoCard title="대상" color="purple" value="2학년" />
            </div>
          </div>
          <div className="md:pl-4 text-sm">
            <b>팀장</b>
            <p>{manager}</p>
            <b>정보</b>
            <div className="text-sm flex items-center text-gray-500">
              <LiaCertificateSolid className="mr-1" />
              <span>{category}</span>
              <span className="px-1">•</span>
              <MdOutlineDateRange className="mr-1" />
              <span>24년도 1학기</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
