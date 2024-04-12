import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { createImageUrl } from '@utils/api';
import { cn } from '@utils/string';

import Image from '../Image/Image';

interface PostCardProps {
  to: string;
  title: string;
  subTitle?: string;
  imageUrl?: string;
}

const PostCard = ({ to, title, subTitle, imageUrl }: PostCardProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => navigate(to), [navigate, to]);

  return (
    <div
      role="button"
      onClick={handleClick}
      className="flex cursor-pointer flex-col items-center space-y-2 rounded-lg p-2 transition hover:bg-gray-100"
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
          className={cn('break-keep', {
            'text-center': !subTitle,
          })}
        >
          {title}
        </p>
        {subTitle && (
          <p className="text-clab-main-light truncate text-sm">{subTitle}</p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
