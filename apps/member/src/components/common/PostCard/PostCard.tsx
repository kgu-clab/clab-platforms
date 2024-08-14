import { useNavigate } from 'react-router-dom';

import { cn } from '@clab-platforms/utils';

import { createImageUrl } from '@utils/api';

import Image from '../Image/Image';

interface PostCardProps {
  to: string;
  title: string;
  subTitle?: string;
  imageUrl?: string;
}

const PostCard = ({ to, title, subTitle, imageUrl }: PostCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(to);

  return (
    <button
      onClick={handleClick}
      className="group flex flex-col items-center space-y-2 rounded-lg p-2 transition hover:bg-gray-100"
    >
      <Image
        src={createImageUrl(imageUrl)}
        alt={title}
        width="w-48"
        height="h-48"
        className="rounded-lg border object-cover"
      />
      <div className="w-48">
        <p
          className={cn(
            'break-keep font-semibold underline-offset-2 group-hover:underline',
            {
              'text-center': !subTitle,
            },
          )}
        >
          {title}
        </p>
        {subTitle && (
          <p className="text-clab-main-light truncate text-sm">{subTitle}</p>
        )}
      </div>
    </button>
  );
};

export default PostCard;
