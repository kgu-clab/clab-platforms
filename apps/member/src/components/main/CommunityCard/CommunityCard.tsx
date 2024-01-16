import Card from '@components/common/Card/Card';
import ListButton from '@components/common/ListButton/ListButton';
import MoreButton from '@components/common/MoreButton/MoreButton';
import { toYYMMDD } from '@utils/date';

interface CommunityCardProps {
  title: string;
  data: {
    id: number;
    type: string;
    title: string;
    createAt: string;
  }[];
}

const CommunityCard = ({ title, data }: CommunityCardProps) => {
  return (
    <Card>
      <Card.Header title={title}>
        <MoreButton to="" />
      </Card.Header>
      <Card.Body>
        {data.slice(0, 6).map(({ id, type, title, createAt }) => (
          <ListButton key={id} to="">
            <p className="break-keep">{type}</p>
            <p className="w-full truncate px-4">{title}</p>
            <p className="text-clab-main-light">{toYYMMDD(createAt)}</p>
          </ListButton>
        ))}
      </Card.Body>
    </Card>
  );
};

interface CommunityProps {
  children: React.ReactNode;
}

CommunityCard.Wrapper = ({ children }: CommunityProps) => {
  return (
    <div className="flex flex-col gap-4 text-sm xl:grid xl:grid-cols-2">
      {children}
    </div>
  );
};

export default CommunityCard;
