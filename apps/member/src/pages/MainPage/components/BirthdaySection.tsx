import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';

import { useBirthday } from '@hooks/queries';
import { createImageUrl } from '@utils/api';
import { formatMemberName } from '@utils/string';
import dayjs from 'dayjs';

export function BirthdaySection() {
  const { data } = useBirthday();

  return (
    <Section>
      <Section.Header title="생일자를 소개합니다" />
      <Section.Body className="scrollbar-hide flex overflow-scroll">
        {data.items.length === 0 ? (
          <p className="w-full text-center text-gray-500">
            이번 달엔 생일자가 없어요.
          </p>
        ) : (
          data.items.map(({ id, ...props }) => (
            <Card key={id} id={id} {...props} />
          ))
        )}
      </Section.Body>
    </Section>
  );
}

interface CardProps {
  id: string;
  name: string;
  imageUrl: string | null;
  birth: string;
}

const Card = ({ id, name, imageUrl, birth }: CardProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg px-4 pt-2">
      <Image
        src={createImageUrl(imageUrl)}
        alt={name}
        width="w-24"
        height="h-24"
        className="rounded-full object-cover ring ring-red-500 ring-offset-2"
      />
      <div className="text-center">
        <p className="text-sm font-semibold">{formatMemberName(name, id)}</p>
        <p className="text-clab-main-light text-sm font-medium">
          {dayjs(birth).format('MM월 DD일')}
        </p>
      </div>
    </div>
  );
};
