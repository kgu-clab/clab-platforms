import Content from '@components/common/Content/Content';
import PostCommentSection from '@components/community/PostCommentSection/PostCommentSection';
import { useParams } from 'react-router-dom';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import { Button } from '@clab/design-system';
import Post from '@components/common/Post/Post';
import HireContentSection from '@components/community/HireContentSection/HireContentSection';
import useModal from '@hooks/common/useModal';
import { useAccusesMutation } from '@hooks/queries/useAccusesMutation';
import {
  categoryToTitle,
  isCommunityCategoryType,
  isHireItem,
} from '@utils/community';
import { usePosts } from '@hooks/queries/usePosts';
import { useState } from 'react';
import Textarea from '@components/common/Textarea/Textarea';
import useBoardModifyMutation from '@hooks/queries/useBoardModifyMutation';
import type { CommunityCategoryType } from '@type/community';

const CommunityPostPage = () => {
  const { type, id } = useParams<{ type: CommunityCategoryType; id: string }>();

  if (!type || !id || !isCommunityCategoryType(type)) {
    throw new Error('잘못된 접근입니다.');
  }

  const { data } = usePosts(type, id);
  const { accusesMutate } = useAccusesMutation();
  const { boardModifyMutate } = useBoardModifyMutation();
  const { openModal } = useModal();

  const [isEditMode, setIsEditMode] = useState(false);
  const [contents, setContents] = useState<string>(data.content || '');

  const subTitle = categoryToTitle(type);

  const onClickAccuses = () => {
    openModal({
      title: '🚨 신고하기',
      content:
        '게시글에 신고 횟수가 많아지면 운영진이 해당 게시글을 검토합니다.\n정말 해당 게시글을 신고하시겠습니까?',
      accept: {
        text: '신고하기',
        onClick: () => {
          accusesMutate({
            targetType: 'BOARD',
            targetId: Number(id),
            reason: '부적절한 게시글입니다.',
          });
        },
      },
    });
  };

  const onClickModify = () => {
    if (isEditMode) {
      // 수정 상태에서 저장 버튼을 누르면 수정된 내용을 저장한다.
      boardModifyMutate({
        id: id,
        body: {
          category: subTitle,
          title: data.title,
          content: contents,
          wantAnonymous: false, // 수정할 경우 익명은 해제
        },
      });
    }

    setIsEditMode((prev) => !prev);
  };

  return (
    <Content>
      <Header title={['커뮤니티', subTitle]} />
      <Section>
        {data && (
          <Post>
            <Post.Head
              title={data.title}
              src={data.memberImageUrl}
              writer={data.writer || 'C-Lab PLAY'}
              roleLevel={1}
              createAt={data.createdAt}
            />
            {isHireItem(data) ? (
              <HireContentSection {...data} />
            ) : isEditMode ? (
              <Textarea
                className="w-full min-h-96"
                value={contents}
                placeholder={data.content}
                onChange={(e) => setContents(e.target.value)}
              />
            ) : (
              <Post.Body>
                {data.content}
                {'articleUrl' in data && data.articleUrl && (
                  <a
                    className="block mb-2 text-sm text-right text-gray-500 hover:underline hover:text-black"
                    target="_blank"
                    href={data.articleUrl}
                  >
                    해당 아티클을 더 읽고 싶다면?
                  </a>
                )}
              </Post.Body>
            )}
            <Post.Footer>
              <Button onClick={onClickAccuses} size="sm" color="red">
                신고
              </Button>
              {data.isOwner && (
                <Button
                  size="sm"
                  color={isEditMode ? 'blue' : 'white'}
                  onClick={onClickModify}
                >
                  {isEditMode ? '저장' : '수정'}
                </Button>
              )}
            </Post.Footer>
          </Post>
        )}
      </Section>
      {!isHireItem(data) && <PostCommentSection id={id} />}
    </Content>
  );
};

export default CommunityPostPage;
