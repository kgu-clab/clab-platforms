import Section from '@components/common/Section/Section';
import Image from '@components/common/Image/Image';
import { getPokemonImage } from '@mocks/mocks';

interface BirthdayListProps {
  data: {
    id: number;
    name: string;
    image: string;
    birth: string;
  }[];
}

const BirthdayList = ({ data }: BirthdayListProps) => {
  return (
    <Section>
      <Section.Header title="생일자를 소개합니다" />
      <Section.Body className="flex overflow-scroll scrollbar-hide">
        {data.map(({ id, name, birth }) => (
          <div
            key={id}
            className="flex flex-col items-center gap-4 rounded-lg px-4 pt-2"
          >
            <Image
              src={getPokemonImage()}
              alt={name}
              width="w-24"
              height="h-24"
              className="rounded-full object-cover ring ring-red-500 ring-offset-2"
            />
            <div className="text-center">
              <div className="text-sm font-semibold">
                <p>{name}</p>
                <p>{id}</p>
              </div>
              <p className="text-sm font-medium text-clab-main-light">
                {birth}
              </p>
            </div>
          </div>
        ))}
      </Section.Body>
    </Section>
  );
};

export default BirthdayList;
