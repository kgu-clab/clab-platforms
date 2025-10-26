import { useState } from 'react';

import { Button, Grid } from '@clab-platforms/design-system';
import EmojiAdd from '@clab-platforms/icon/src/outline/react/EmojiAdd';
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
  const [isShowReactionModal, setIsShowReactionModal] = useState(false);

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
          <div className="mt-8 flex justify-start space-x-2">
            {data.boardHashtagInfos?.map(({ id, name }) => (
              <div
                key={id}
                className="rounded-full border border-blue-400 bg-blue-50 px-3 font-semibold text-blue-400"
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </Post.Body>
      <Post.Footer className="flex justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            className="flex size-fit justify-center rounded-full border p-1 hover:bg-gray-100"
            onClick={() => setIsShowReactionModal(!isShowReactionModal)}
          >
            <EmojiAdd />
          </button>
          {isShowReactionModal && (
            <div className="absolute mt-11 flex gap-6 rounded-full border bg-white px-4 py-1 shadow-lg transition">
              {EMOJI.map(({ name }) => (
                <button
                  onClick={() => handleReactionButtonClick(data.id, name)}
                  className="text-xl hover:cursor-pointer"
                  key={name}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
          <Grid gap="sm" col="4">
            {EMOJI.map(({ name, value }) => {
              const countNumber =
                data.emojiInfos?.find(
                  (emoji) => toDecodeHTMLEntities(emoji.emoji) === name,
                )?.count ?? 0;

              if (countNumber)
                return (
                  <ReactionButton
                    key={value}
                    onClick={() => handleReactionButtonClick(data.id, name)}
                    disabled={isPending}
                    countNumber={countNumber}
                    className="transition"
                  >
                    <p className="text-md sm:text-xl">{name}</p>
                  </ReactionButton>
                );
            })}
          </Grid>
        </div>
        <div className="flex gap-2">
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
