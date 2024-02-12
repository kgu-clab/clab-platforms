import Content from '@components/common/Content/Content';
import PostCommentSection from '@components/community/PostCommentSection/PostCommentSection';
import { useParams } from 'react-router-dom';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import { Button } from '@clab/design-system';
import Post from '@components/common/Post/Post';
import { ERROR_MESSAGE } from '@constants/message';
import { useCommunityPost } from '@hooks/queries/useCommunityPost';
import { useAccuses } from '@hooks/queries/useAccuses';
import { getPokemonImage } from '@mocks/mocks';

const getSubTitle = (type = 'error'): string => {
  return {
    notice: '공지사항',
    free: '자유',
    qna: 'QnA',
    graduated: '졸업생',
    news: 'IT 뉴스',
    hire: '채용 정보',
    error: ERROR_MESSAGE.default,
  }[type] as string;
};

const CommunityPostPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const { data: postData } = useCommunityPost(id);
  const { accusesData } = useAccuses();
  // const { postMutate } = useCommunityPostMutation();

  const subTitle = getSubTitle(type) || ERROR_MESSAGE.default;

  const info = {
    targetType: 'BOARD',
    targetId: Number(id),
    reason: '부적절한 게시글입니다.',
  };
  const onClickAccuses = () => {
    if (window.confirm('신고하시겠습니까?')) {
      accusesData(info);
      alert('신고가 완료되었습니다.');
    } else {
      alert('취소되었습니다.');
    }
  };

  return (
    <Content>
      <Header title={['커뮤니티', subTitle]} />
      <Section>
        <Post>
          <Post.Head
            title={postData.title}
            src={
              postData.memberImageUrl
                ? postData.memberImageUrl
                : getPokemonImage()
            }
            writer={postData.writer}
            createAt={postData.createdAt}
          />
          <Post.Body>{postData.content}</Post.Body>
          <Post.Footer>
            <Button onClick={onClickAccuses} size="sm" color="red">
              신고
            </Button>
            <Button size="sm">수정</Button>
          </Post.Footer>
        </Post>
      </Section>
      {id && <PostCommentSection id={Number(id)} />}
    </Content>
  );
};

export default CommunityPostPage;
