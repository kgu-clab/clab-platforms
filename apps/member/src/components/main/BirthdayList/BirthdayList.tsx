import Section from '@components/common/Section/Section';
import Image from '@components/common/Image/Image';
import type { MemberType } from '@type/member';
import dayjs from 'dayjs';
import { createImageUrl } from '@utils/api';

interface BirthdayListProps {
  data: Array<MemberType>;
}

interface BirthdayCardProps {
  id: string;
  name: string;
  imageUrl?: string;
  birth: string;
}

const BirthdayCard = ({ id, name, imageUrl, birth }: BirthdayCardProps) => {
  return (
    <div className="flex flex-col items-center gap-4 px-4 pt-2 rounded-lg">
      <Image
        src={imageUrl ? createImageUrl(imageUrl) : imageUrl}
        alt={name}
        width="w-24"
        height="h-24"
        className="object-cover rounded-full ring ring-red-500 ring-offset-2"
      />
      <div className="text-center">
        <div className="text-sm font-semibold">
          <p>{name}</p>
          <p>{id}</p>
        </div>
        <p className="text-sm font-medium text-clab-main-light">
          {dayjs(birth).format('MM월 DD일')}
        </p>
      </div>
    </div>
  );
};

const BirthdayList = ({ data }: BirthdayListProps) => {
  return (
    <Section>
      <Section.Header title="생일자를 소개합니다" />
      <Section.Body className="flex overflow-scroll scrollbar-hide">
        {data.length === 0 ? (
          <p className="w-full text-center text-gray-500">
            이번 달엔 생일자가 없어요!
          </p>
        ) : (
          data.map(({ id, ...props }) => (
            <BirthdayCard key={id} id={id} {...props} />
          ))
        )}
      </Section.Body>
    </Section>
  );
};

export default BirthdayList;
