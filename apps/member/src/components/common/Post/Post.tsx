/* eslint-disable react/display-name */
import { MODE } from '@constants/environment';
import { createImageUrl } from '@utils/api';
import { formattedDate } from '@utils/date';
import { cn } from '@utils/string';
import { getProfileRingStyle } from '@utils/style';

import { StrictPropsWithChildren } from '@type/component';

import Image from '../Image/Image';
import Share from '../Share/Share';

interface PostHeaderProps {
  title: string;
  createdAt: string;
  src?: string | null;
  writer?: string;
  roleLevel?: number | null;
}

interface Props extends StrictPropsWithChildren {
  className?: string;
}

const Post = ({ className, children }: Props) => {
  return <div className={cn('flex flex-col gap-4', className)}>{children}</div>;
};

Post.Head = ({
  title,
  src = '',
  writer = 'C-Lab',
  roleLevel = 1,
  createdAt,
}: PostHeaderProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div
            className={cn(
              'rounded-full ring ring-offset-1',
              getProfileRingStyle(roleLevel),
            )}
          >
            <Image
              className="rounded-full"
              width="w-10"
              height="w-10"
              src={createImageUrl(src)}
              alt="작성자 프로필사진"
            />
          </div>
          <div className="text-sm">
            <p className="font-semibold">{writer}</p>
            <p>{formattedDate(createdAt)}</p>
          </div>
        </div>
        {MODE !== 'production' && <Share />}
      </div>
      <hr />
    </div>
  );
};

Post.Body = ({ className, children }: Props) => {
  return (
    <div className={cn('whitespace-pre-wrap break-words', className)}>
      {children}
    </div>
  );
};

Post.Footer = ({ className, children }: Props) => {
  return (
    <div className={cn('flex justify-end gap-2', className)}>{children}</div>
  );
};

export default Post;
