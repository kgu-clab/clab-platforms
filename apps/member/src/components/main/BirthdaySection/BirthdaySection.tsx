import Section from '@components/common/Section/Section';
import Image from '@components/common/Image/Image';
import dayjs from 'dayjs';
import { createImageUrl } from '@utils/api';
import { useBirthday } from '@hooks/queries';

interface BirthdayCardProps {
  id: string;
  name: string;
  imageUrl?: string;
  birth: string;
}

const BirthdaySection = () => {
  const { data } = useBirthday();

  return (
    <Section>
      <Section.Header title="생일자를 소개합니다" />
      <Section.Body className="flex overflow-scroll scrollbar-hide">
        {data.items.length === 0 ? (
          <p className="w-full text-center text-gray-500">
            이번 달엔 생일자가 없어요.
          </p>
        ) : (
          data.items.map(({ id, ...props }) => (
            <BirthdayCard key={id} id={id} {...props} />
          ))
        )}
      </Section.Body>
    </Section>
  );
};

const BirthdayCard = ({ id, name, imageUrl, birth }: BirthdayCardProps) => {
  return (
    <div className="flex flex-col items-center gap-4 px-4 pt-2 rounded-lg">
      <Image
        src={createImageUrl(imageUrl)}
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

export default BirthdaySection;
