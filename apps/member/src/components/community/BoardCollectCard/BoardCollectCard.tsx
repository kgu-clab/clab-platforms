import { LiaCommentSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';

import Image from '@components/common/Image/Image';

import { PATH_FINDER } from '@constants/path';
import { createImageUrl } from '@utils/api';
import { getCategoryEmoji } from '@utils/community';
import { formattedDate } from '@utils/date';
import { formatMemberName, toDecodeHTMLEntities } from '@utils/string';

import type { Board } from '@type/community';

interface BoardCollectCardProps extends Board {}

const BoardCollectCard = ({
  id,
  category,
  title,
  content,
  commentCount,
  writerId,
  writerName,
  imageUrl,
  createdAt,
}: BoardCollectCardProps) => {
  return (
    <Link
      to={PATH_FINDER.COMMUNITY_POST(category, id)}
      className="hover:border-clab-main-light flex flex-col items-center gap-2 rounded-lg border p-2 text-sm transition-colors"
    >
      <div className="flex w-full items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl">
          {getCategoryEmoji(category)}
        </div>
        <div className="grid w-full">
          <p className="truncate font-semibold">{title}</p>
          <p className="truncate text-gray-500">
            {toDecodeHTMLEntities(content)}
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <p className="flex w-12 items-center gap-1">
            <LiaCommentSolid />
            {commentCount}
          </p>
          <div className="hidden w-32 md:block">
            <p>{formatMemberName(writerName, writerId)}</p>
            <p>{formattedDate(createdAt)}</p>
          </div>
        </div>
      </div>
      {imageUrl && (
        <Image
          src={createImageUrl(imageUrl)}
          height="h-[200px]"
          className="rounded-lg object-cover"
        />
      )}
    </Link>
  );
};

export default BoardCollectCard;
