import { Table } from '@clab-platforms/design-system';
import { cn, toDecodeHTMLEntities } from '@clab-platforms/utils';

import CommentCounter from '@components/common/CommentCounter/CommentCounter';

import { SERVICE_NAME } from '@constants/environment';
import { toYYMMDD } from '@utils/date';

interface CommunityPostsItemProps {
  id: number;
  title: string;
  commentCount: number;
  writerName: string;
  createdAt: string;
  onClick: () => void;
  index?: number;
  currentId?: number;
}

const CommunityPostsItem = ({
  id,
  title,
  commentCount,
  writerName,
  createdAt,
  onClick,
  index,
  currentId,
}: CommunityPostsItemProps) => {
  return (
    <Table.Row
      key={id}
      className={cn('text-nowrap text-center', {
        'bg-gray-50 font-semibold': id === currentId,
      })}
      onClick={onClick}
    >
      <Table.Cell
        className={cn('w-1/12', { 'font-semibold text-red-500': !index })}
      >
        {index ? index : 'HOT'}
      </Table.Cell>
      <Table.Cell className="w-7/12 truncate text-left">
        {toDecodeHTMLEntities(title)}
        <CommentCounter>{commentCount}</CommentCounter>
      </Table.Cell>
      <Table.Cell className="w-3/12">{writerName || SERVICE_NAME}</Table.Cell>
      <Table.Cell className="w-1/12">{toYYMMDD(createdAt)}</Table.Cell>
    </Table.Row>
  );
};

export default CommunityPostsItem;
