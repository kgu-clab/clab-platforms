import Content from '@components/common/Content/Content';
import PostCommentSection from '@components/community/PostCommentSection/PostCommentSection';
import { useParams } from 'react-router-dom';
import Header from '@components/common/Header/Header';
import post from '@mocks/data/post.json';
import Section from '@components/common/Section/Section';
import { Button } from '@clab/design-system';
import Post from '@components/common/Post/Post';
import { getPokemonImage } from '@mocks/mocks';
import { ERROR_MESSAGE } from '@constants/message';

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
  const { type } = useParams<{ type: string }>();
  const { title, writer, contents, createAt } = post;

  const subTitle = getSubTitle(type) || ERROR_MESSAGE.default;

  return (
    <Content>
      <Header title={['커뮤니티', subTitle]} />
      <Section>
        <Post>
          <Post.Head
            title={title}
            src={getPokemonImage()}
            writer={writer}
            createAt={createAt}
          />
          <Post.Body>{contents}</Post.Body>
          <Post.Footer>
            <Button size="sm" color="red">
              신고
            </Button>
            <Button size="sm">수정</Button>
          </Post.Footer>
        </Post>
      </Section>
      <PostCommentSection />
    </Content>
  );
};

export default CommunityPostPage;
