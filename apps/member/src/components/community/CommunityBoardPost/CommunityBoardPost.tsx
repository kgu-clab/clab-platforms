import { useState } from 'react';

import { Button } from '@clab/design-system';

import Post from '@components/common/Post/Post';
import Textarea from '@components/common/Textarea/Textarea';

import { useBoardModifyMutation } from '@hooks/queries';
import { formatMemberName } from '@utils/string';

import type {
  CommunityCategoryType,
  CommunityPostDetailItem,
} from '@type/community';

import CommunityDeleteButton from '../CommunityDeleteButton/CommunityDeleteButton';
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
   * 카테고리, 제목 등 다른 정보를 수정하려면 추가 구현이 필요합니다.
   */
  const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContents(e.target.value);
  /**
   * 저장 버튼 클릭 이벤트
   * 수정 모드에서 저장 버튼을 누르면 수정된 내용을 저장합니다.
   */
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
            wantAnonymous: !data.writerId,
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
        // 수정 모드, Textarea를 통해서 수정할 수 있다.
        <Textarea
          className="min-h-96 w-full"
          maxLength={5000}
          value={contents}
          placeholder={data.content}
          onChange={handleContentsChange}
        />
      ) : (
        <Post.Body className="min-h-60">{data.content}</Post.Body>
      )}
      <Post.Footer>
        {data.isOwner ? (
          // 작성자인 경우 삭제 버튼을 보여준다.
          <CommunityDeleteButton id={data.id} />
        ) : (
          // 작성자가 아닌 경우 신고 버튼을 보여준다.
          <CommunityReportButton id={data.id} />
        )}
        {isEditMode && (
          // 수정 모드인 경우 취소 버튼을 보여준다.
          <Button size="sm" color="red" onClick={() => setIsEditMode(false)}>
            취소
          </Button>
        )}
        {data.isOwner && (
          // 작성자인 경우 수정 버튼을 보여준다.
          <Button size="sm" onClick={handleSaveClick}>
            {isEditMode ? '저장' : '수정'}
          </Button>
        )}
      </Post.Footer>
    </Post>
  );
};

export default CommunityBoardPost;
