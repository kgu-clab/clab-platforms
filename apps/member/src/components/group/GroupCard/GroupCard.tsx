import classNames from 'classnames';
import { PATH_FINDER } from '@constants/path';
import { useNavigate } from 'react-router-dom';
import { LiaCertificateSolid } from 'react-icons/lia';
import { MdOutlineDateRange } from 'react-icons/md';
import Image from '@components/common/Image/Image';
import { useActivityGroupMemberDetail } from '@hooks/queries/useActivityGroupMemberDetail';
import { useActivityGroupBoardsByCategory } from '@hooks/queries/useActivityGroupBoardsByCategory';
import { getDateSemester } from '@utils/date';

interface InfoCardProps {
  title: string;
  value: string | number;
  color: string;
}

interface GroupCardProps {
  id: number;
  imageUrl?: string;
  name: string;
  category: string;
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
        'items-center flex flex-col px-4 py-2 rounded text-center',
        colorClass,
      )}
    >
      <b>{value || 0}</b>
      <p className="font-semibold text-xsr">{title}</p>
    </div>
  );
};

const GroupCard = ({ id, imageUrl, name, category }: GroupCardProps) => {
  const navigate = useNavigate();
  const { data: groupDetailData } = useActivityGroupMemberDetail(id, category);
  const { data: groupBoardData } = useActivityGroupBoardsByCategory(
    id,
    'WEEKLY_ACTIVITY',
    0,
    20,
  );

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
          <p className="text-gray-600 text-sm">{groupDetailData.content}</p>
        </div>
        <div className="grid md:grid-cols-2 md:divide-x pt-4 text-sm">
          <div className="pr-4 hidden md:block">
            <b>내용</b>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <InfoCard
                title="주차"
                color="yellow"
                value={groupBoardData.items?.length || 0}
              />
              <InfoCard
                title="인원"
                color="blue"
                value={groupDetailData.groupMembers?.length || 1}
              />
              <InfoCard
                title="대상"
                color="purple"
                value={groupDetailData.subject}
              />
            </div>
          </div>
          <div className="md:pl-4 text-sm">
            <b>팀장</b>
            <p>
              {
                groupDetailData.groupMembers?.find(
                  (member) => member.role === 'LEADER',
                )?.memberName
              }
            </p>
            <b>정보</b>
            <div className="text-sm flex items-center text-gray-500">
              <LiaCertificateSolid className="mr-1" />
              <span>{category}</span>
              <span className="px-1">•</span>
              <MdOutlineDateRange className="mr-1" />
              <span>{getDateSemester(groupDetailData.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
