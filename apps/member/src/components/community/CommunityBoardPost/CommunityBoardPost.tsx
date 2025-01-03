import { useState } from 'react';

import { Button } from '@clab-platforms/design-system';

import Image from '@components/common/Image/Image';
import Post from '@components/common/Post/Post';

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
        createdAt={toKoreaISOString(data.createdAt)}
      />
      {data.imageUrl && (
        <Image
          height="min-h-[300px]"
          alt="thumbnail"
          className="object-cover "
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
      <Post.Footer>
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
      </Post.Footer>
    </Post>
  );
};

export default CommunityBoardPost;
