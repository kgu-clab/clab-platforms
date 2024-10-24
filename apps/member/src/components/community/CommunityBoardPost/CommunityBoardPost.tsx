import { useState } from 'react';

import { Button, Grid } from '@clab-platforms/design-system';

import Image from '@components/common/Image/Image';
import Post from '@components/common/Post/Post';
import ReactionButton from '@components/common/ReactionButton/ReactionButton';

import { createImageUrl } from '@utils/api';
import { formatMemberName } from '@utils/string';

import type { CommunityPostDetailItem } from '@type/community';

import CommunityBoardForm from '../CommunityBoardForm/CommunityBoardForm';
import CommunityDeleteButton from '../CommunityDeleteButton/CommunityDeleteButton';
import CommunityReportButton from '../CommunityReportButton/CommunityReportButton';

interface CommunityBoardPostProps {
  data: CommunityPostDetailItem;
}

const ReactionEmoji = [
  {
    name: '👍',
    value: 'good',
  },
  {
    name: '👎',
    value: 'bad',
  },
  {
    name: '🚀',
    value: 'rocket',
  },
  {
    name: '👀',
    value: 'eyes',
  },
];

const CommunityBoardPost = ({ data }: CommunityBoardPostProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleIsEditClick = () => setIsEdit((prev) => !prev);

  if (isEdit) {
    // 수정 모드인 경우
    return <CommunityBoardForm data={data} onClose={handleIsEditClick} />;
  }

  return (
    <Post>
      <Post.Head
        title={data.title}
        src={data.writerImageUrl}
        writer={formatMemberName(data.writerName, data.writerId)}
        roleLevel={data.writerRoleLevel}
        createdAt={data.createdAt}
      />
      {data.imageUrl && (
        <Image
          height="min-h-[300px]"
          alt="thumbnail"
          className="object-cover"
          src={createImageUrl(data.imageUrl)}
        />
      )}
      <Post.Body className="min-h-60">{data.content}</Post.Body>
      <Post.Footer className="flex flex-col items-end">
        <Grid gap="lg" col="4" className="item-center mx-auto">
          {ReactionEmoji.map(({ name, value }) => (
            <ReactionButton key={value}>
              <p className="text-3xl">{name}</p>
            </ReactionButton>
          ))}
        </Grid>
        <div>
          {data.isOwner ? (
            // 작성자인 경우 삭제 버튼을 보여준다.
            <CommunityDeleteButton id={data.id} />
          ) : (
            // 작성자가 아닌 경우 신고 버튼을 보여준다.
            <CommunityReportButton id={data.id} />
          )}
          {data.isOwner && (
            // 작성자인 경우 수정 버튼을 보여준다.
            <Button size="sm" onClick={handleIsEditClick}>
              수정
            </Button>
          )}
        </div>
      </Post.Footer>
    </Post>
  );
};

export default CommunityBoardPost;
