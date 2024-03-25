import { PropsWithChildren } from 'react';
import Image from '../Image/Image';
import { formattedDate } from '@utils/date';
import Share from '../Share/Share';
import { MODE } from '@constants/environment';
import { createImageUrl } from '@utils/api';
import { getProfileRingStyle } from '@utils/style';
import classNames from 'classnames';

interface PostHeaderProps {
  title: string;
  src?: string;
  writer: string;
  roleLevel: number;
  createAt: string;
}

const Post = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

Post.Head = ({ title, src, writer, roleLevel, createAt }: PostHeaderProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div
            className={classNames(
              'rounded-full ring ring-offset-1',
              getProfileRingStyle(roleLevel),
            )}
          >
            <Image
              className="rounded-full"
              width="w-10"
              height="w-10"
              src={createImageUrl(src || '')}
              alt="작성자 프로필사진"
            />
          </div>
          <div className="text-sm">
            <p className="font-semibold">{writer}</p>
            <p>{formattedDate(createAt)}</p>
          </div>
        </div>
        {MODE !== 'production' && <Share />}
      </div>
      <hr />
    </div>
  );
};

Post.Body = ({ children }: PropsWithChildren) => {
  return <h2 className="break-words whitespace-pre-wrap">{children}</h2>;
};

Post.Footer = ({ children }: PropsWithChildren) => {
  return <div className="flex justify-end gap-2">{children}</div>;
};

export default Post;
