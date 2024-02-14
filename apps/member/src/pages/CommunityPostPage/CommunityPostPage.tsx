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
import type { CommunityCategoryType } from '@type/community';
import { usePosts } from '@hooks/queries/usePosts';

const CommunityPostPage = () => {
  const { type, id } = useParams<{ type: CommunityCategoryType; id: string }>();

  if (!type || !id || !isCommunityCategoryType(type)) {
    throw new Error('잘못된 접근입니다.');
  }

  const { data } = usePosts(type, id);
  const { accusesMutate } = useAccusesMutation();

  const { openModal } = useModal();

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

  return (
    <Content>
      <Header title={['커뮤니티', subTitle]} />
      <Section>
        {data && (
          <Post>
            <Post.Head
              title={data.title}
              src={data.memberImageUrl}
              writer={data.writer}
              createAt={data.createdAt}
            />
            {isHireItem(data) ? (
              <HireContentSection {...data} />
            ) : (
              <Post.Body>{data.content}</Post.Body>
            )}
            <Post.Footer>
              <Button onClick={onClickAccuses} size="sm" color="red">
                신고
              </Button>
              <Button size="sm">수정</Button>
            </Post.Footer>
          </Post>
        )}
      </Section>
      {!isHireItem(data) && <PostCommentSection id={id} />}
    </Content>
  );
};

export default CommunityPostPage;
