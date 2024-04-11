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
      className="flex flex-col items-center p-2 space-y-2 transition rounded-lg cursor-pointer hover:bg-gray-100"
    >
      <Image
        src={createImageUrl(imageUrl)}
        alt={title}
        width="w-48"
        height="h-48"
        className="object-cover border rounded-lg"
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
          <p className="text-sm truncate text-clab-main-light">{subTitle}</p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
