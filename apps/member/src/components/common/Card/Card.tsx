import { useNavigate } from 'react-router-dom';
import Image from '../Image/Image';
import { createImageUrl } from '@utils/api';
import classNames from 'classnames';

interface CardProps {
  to?: string;
  image?: string;
  title: string;
  description?: string;
}

const Card = ({ to, image, title, description }: CardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    to && navigate(to);
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col items-center p-2 space-y-2 transition rounded-lg cursor-pointer hover:bg-gray-100"
    >
      {image && (
        <Image
          src={createImageUrl(image)}
          alt={title}
          width="w-48"
          height="h-48"
          className="object-cover border rounded-lg"
        />
      )}
      <div className="w-48">
        <p
          className={classNames('break-keep font-semibold', {
            'text-center': !description,
          })}
        >
          {title}
        </p>
        {description && (
          <p className="text-sm truncate text-clab-main-light">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
