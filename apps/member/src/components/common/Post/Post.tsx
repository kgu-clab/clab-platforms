import { PropsWithChildren } from 'react';
import Image from '../Image/Image';
import { formattedDate } from '@utils/date';
import Share from '../Share/Share';

interface PostHeaderProps {
  title: string;
  src: string;
  writer: string;
  createAt: string;
}

const Post = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

Post.Head = ({ title, src, writer, createAt }: PostHeaderProps) => {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Image
            className="rounded-full"
            width="w-10"
            height="w-10"
            src={src}
            alt="작성자 프로필사진"
          />
          <div className="text-sm">
            <p className="font-semibold">{writer}</p>
            <p>{formattedDate(createAt)}</p>
          </div>
        </div>
        <Share />
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
