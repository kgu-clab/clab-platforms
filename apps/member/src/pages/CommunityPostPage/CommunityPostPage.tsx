import { useParams } from 'react-router-dom';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import CommunityBoardPost from '@components/community/CommunityBoardPost/CommunityBoardPost';
import CommunityHirePost from '@components/community/CommunityHirePost/CommunityHirePost';
import CommunityNewsPost from '@components/community/CommunityNewsPost/CommunityNewsPost';
import PostCommentSection from '@components/community/PostCommentSection/PostCommentSection';

import { ERROR_MESSAGE } from '@constants/message';
import { usePosts } from '@hooks/queries/usePosts';
import { categoryToTitle, isCommunityCategoryType } from '@utils/community';

import type { CommunityCategoryType } from '@type/community';

const CommunityPostPage = () => {
  const { type, id } = useParams<{ type: CommunityCategoryType; id: string }>();

  if (!id || !isCommunityCategoryType(type)) {
    throw new Error(ERROR_MESSAGE.NOT_FOUND);
  }

  const { data } = usePosts(type, id);

  if (!data.id) throw new Error(ERROR_MESSAGE.NOT_FOUND);

  let renderPost: React.ReactNode = null;
  if ('articleUrl' in data) {
    // IT 뉴스
    renderPost = <CommunityNewsPost data={data} />;
  } else if ('jobPostingUrl' in data) {
    // 채용 정보
    renderPost = <CommunityHirePost data={data} />;
  } else {
    // 일반 게시판
    renderPost = <CommunityBoardPost type={type} data={data} />;
  }

  return (
    <Content>
      <Header title={['커뮤니티', categoryToTitle(type)]} />
      <Section>{renderPost}</Section>
      {'writerRoleLevel' in data && <PostCommentSection id={id} />}
    </Content>
  );
};

export default CommunityPostPage;
