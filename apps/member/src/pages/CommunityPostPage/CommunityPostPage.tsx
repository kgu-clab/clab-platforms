import Content from '@components/common/Content/Content';
import PostCommentSection from '@components/community/PostCommentSection/PostCommentSection';
import { useParams } from 'react-router-dom';
import Header from '@components/common/Header/Header';
import { PATH } from '@constants/path';
import postData from '@mocks/data/postData.json';
import Section from '@components/common/Section/Section';
import PostTitleSection from '@components/community/PostTitleSection/PostTitleSection';
import PostProfileSection from '@components/community/PostProfileSection/PostProfileSection';
import PostTextSection from '@components/community/PostTextSection/PostTextSection';

const CommunityPostPage = () => {
  const { sort } = useParams();
  const data = postData;

  return (
    <Content>
      <Header name="커뮤니티" button="글쓰기" to={PATH.COMMUNITY_WRITE} />
      <Section>
        <PostTitleSection title={data.title} />
        <PostProfileSection
          sort={sort}
          image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww"
          writer={data.writer}
          createAt={data.createAt}
        />
        <PostTextSection contents={data.contents} />
      </Section>
      <PostCommentSection />
    </Content>
  );
};

export default CommunityPostPage;
