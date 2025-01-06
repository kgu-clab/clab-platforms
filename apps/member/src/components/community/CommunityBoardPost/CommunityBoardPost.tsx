import { useState } from 'react';

import { Button, Grid } from '@clab-platforms/design-system';
import { toDecodeHTMLEntities } from '@clab-platforms/utils/src/string';

import Image from '@components/common/Image/Image';
import Post from '@components/common/Post/Post';
import ReactionButton from '@components/common/ReactionButton/ReactionButton';

import { useBoardEmojiMutation } from '@hooks/queries/board/useBoardEmojiMutation';
import { createImageUrl } from '@utils/api';
import { toKoreaISOString } from '@utils/date';
import { formatMemberName } from '@utils/string';

import type { CommunityPostDetailItem } from '@type/community';

import CommunityBoardForm from '../CommunityBoardForm/CommunityBoardForm';
import CommunityDeleteButton from '../CommunityDeleteButton/CommunityDeleteButton';
import CommunityReportButton from '../CommunityReportButton/CommunityReportButton';

interface CommunityBoardPostProps {
  data: CommunityPostDetailItem;
}

const EMOJI = [
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
] as const;

const CommunityBoardPost = ({ data }: CommunityBoardPostProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const { boardEmojiMutate, isPending } = useBoardEmojiMutation();

  const handleIsEditClick = () => setIsEdit((prev) => !prev);

  if (isEdit) {
    // 수정 모드인 경우
    return <CommunityBoardForm data={data} onClose={handleIsEditClick} />;
  }

  const handleReactionButtonClick = (boardId: number, emoji: string) => {
    return boardEmojiMutate({ boardId, emoji });
  };

  return (
    <Post>
      <Post.Head
        title={data.title}
        src={data.writerImageUrl}
        writer={formatMemberName(data.writerName, data.writerId)}
        roleLevel={data.writerRoleLevel}
        createdAt={toKoreaISOString(data.createdAt)}
      />
      {data.imageUrl && (
        <Image
          height="min-h-[300px]"
          alt="thumbnail"
          className="object-cover"
          src={createImageUrl(data.imageUrl)}
        />
      )}
      <Post.Body className="flex min-h-60 flex-col justify-between">
        {data.content}
        {data.category === 'development_qna' && data.boardHashtagInfos && (
          <div className="mt-8 flex space-x-2">
            {data.boardHashtagInfos?.map(({ id, name }) => (
              <div
                key={id}
                className="rounded-full bg-gray-100 px-4 py-1 font-semibold text-gray-500"
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </Post.Body>
      <Post.Footer className="flex flex-col items-end">
        <Grid gap="lg" col="4" className="mx-auto">
          {EMOJI.map(({ name, value }) => {
            const countNumber =
              data.emojiInfos?.find(
                (emoji) => toDecodeHTMLEntities(emoji.emoji) === name,
              )?.count ?? 0;

            return (
              <ReactionButton
                key={value}
                onClick={() => handleReactionButtonClick(data.id, name)}
                disabled={isPending}
                countNumber={countNumber}
              >
                <p className="text-3xl">{name}</p>
              </ReactionButton>
            );
          })}
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
