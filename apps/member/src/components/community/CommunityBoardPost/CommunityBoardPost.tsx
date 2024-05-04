import { useCallback, useState } from 'react';

import { Button } from '@clab/design-system';

import Post from '@components/common/Post/Post';
import Textarea from '@components/common/Textarea/Textarea';

import useBoardModifyMutation from '@hooks/queries/useBoardModifyMutation';
import { formatMemberName } from '@utils/string';

import type {
  CommunityCategoryType,
  CommunityPostDetailItem,
} from '@type/community';

import CommunityReportButton from '../CommunityReportButton/CommunityReportButton';

interface CommunityBoardPostProps {
  type: CommunityCategoryType;
  data: CommunityPostDetailItem;
}

const CommunityBoardPost = ({ type, data }: CommunityBoardPostProps) => {
  const { boardModifyMutate } = useBoardModifyMutation();

  const [contents, setContents] = useState(data.content);
  const [isEditMode, setIsEditMode] = useState(false);

  /**
   * 게시글 내용 변경 이벤트
   * 현재는 게시글 내용만 수정이 가능하도록 구현되어 있습니다.
   */
  const handleContentsChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContents(e.target.value),
    [],
  );

  const handleSaveClick = () => {
    setIsEditMode((prev) => {
      if (prev) {
        // 수정 상태에서 저장 버튼을 누르면 수정된 내용을 저장한다.
        boardModifyMutate({
          id: data.id,
          body: {
            category: type,
            title: data.title,
            content: contents,
            wantAnonymous: !data.writerImageUrl,
          },
        });
      }
      return !prev;
    });
  };

  return (
    <Post>
      <Post.Head
        title={data.title}
        src={data.writerImageUrl}
        writer={formatMemberName(data.writerName, data.writerId)}
        roleLevel={data.writerRoleLevel}
        createdAt={data.createdAt}
      />
      {isEditMode ? (
        <Textarea
          className="min-h-96 w-full"
          maxLength={2000}
          value={contents}
          placeholder={data.content}
          onChange={handleContentsChange}
        />
      ) : (
        <Post.Body className="min-h-60">{data.content}</Post.Body>
      )}
      <Post.Footer>
        <CommunityReportButton id={data.id} />
        {isEditMode && (
          <Button size="sm" color="red" onClick={() => setIsEditMode(false)}>
            취소
          </Button>
        )}
        {data.isOwner && (
          <Button size="sm" onClick={handleSaveClick}>
            {isEditMode ? '저장' : '수정'}
          </Button>
        )}
      </Post.Footer>
    </Post>
  );
};

export default CommunityBoardPost;
