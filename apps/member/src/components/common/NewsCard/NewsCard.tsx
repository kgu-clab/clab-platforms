import classNames from 'classnames';
import Image from '../Image/Image';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  to: string;
  image: string;
  title: string;
  description?: string;
}

const NewsCard = ({ to, image, title, description }: NewsCardProps) => {
  return (
    <Link
      to={to}
      className="cursor-pointer space-y-2 rounded-lg p-2 transition hover:bg-gray-100 items-center flex flex-col"
    >
      <Image
        src={image}
        alt={title}
        width="w-48"
        height="h-48"
        className="rounded-lg object-cover border"
      />
      <div className="w-48">
        <p
          className={classNames('break-keep font-semibold', {
            'text-center': !description,
          })}
        >
          {title}
        </p>
        {description && (
          <p className="truncate text-sm text-clab-main-light">{description}</p>
        )}
      </div>
    </Link>
  );
};

export default NewsCard;
