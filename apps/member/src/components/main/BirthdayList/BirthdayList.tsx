import Card from '@components/common/Card/Card';
import Image from '@components/common/Image/Image';

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
    <Card>
      <Card.Header title="생일자를 소개합니다" />
      <Card.Body className="flex overflow-scroll scrollbar-hide">
        {data.map(({ id, name, image, birth }) => (
          <div
            key={id}
            className="flex flex-col items-center gap-4 rounded-lg px-4 pt-2"
          >
            <Image
              src={image}
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
      </Card.Body>
    </Card>
  );
};

export default BirthdayList;
