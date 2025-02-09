import { Suspense } from 'react';
import { useParams } from 'react-router';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Section from '@components/common/Section/Section';
import CommunityBoardPost from '@components/community/CommunityBoardPost/CommunityBoardPost';
import CommunityHirePost from '@components/community/CommunityHirePost/CommunityHirePost';
import CommunityNewsPost from '@components/community/CommunityNewsPost/CommunityNewsPost';
import CommunityPostsSection from '@components/community/CommunityPostsSection/CommunityPostsSection';
import CommunityWriteButton from '@components/community/CommunityWriteButton/CommunityWriteButton';
import PostCommentSection from '@components/community/PostCommentSection/PostCommentSection';

import { API_ERROR_MESSAGE, ERROR_MESSAGE } from '@constants/message';
import { PATH, PATH_FINDER, PATH_NAME } from '@constants/path';
import { useBoardDetail } from '@hooks/queries';
import { getCategoryTitle, isCommunityCategoryType } from '@utils/community';

import type { CommunityCategoryType } from '@type/community';

const CommunityPostPage = () => {
  const { type, id } = useParams<{ type: CommunityCategoryType; id: string }>();

  if (!id || !isCommunityCategoryType(type)) {
    throw new Error(ERROR_MESSAGE.NOT_FOUND);
  }

  const { data: response } = useBoardDetail(type, +id);

  if (response.errorMessage) {
    throw new Error(API_ERROR_MESSAGE[response.errorMessage]);
  }

  const isBoardPost = 'writerRoleLevel' in response.data; // 게시판 글인지 확인

  let renderPost: React.ReactNode = null;
  if ('articleUrl' in response.data) {
    // IT 뉴스
    renderPost = <CommunityNewsPost data={response.data} />;
  } else if ('jobPostingUrl' in response.data) {
    // 채용 정보
    renderPost = <CommunityHirePost data={response.data} />;
  } else {
    // 일반 게시판
    renderPost = <CommunityBoardPost data={response.data} />;
  }

  return (
    <Content>
      <Header
        title={[PATH_NAME.COMMUNITY, getCategoryTitle(type)]}
        path={[PATH.COMMUNITY, PATH_FINDER.COMMUNITY_DETAIL(type)]}
      >
        {isBoardPost && <CommunityWriteButton />}
      </Header>
      <Suspense>
        <Section>{renderPost}</Section>
      </Suspense>
      <Suspense>{isBoardPost && <PostCommentSection id={+id} />}</Suspense>
      <Suspense>
        <CommunityPostsSection
          type={type}
          id={response.data.id}
          size={5}
          title="이 카테고리 최신글"
        />
      </Suspense>
    </Content>
  );
};

export default CommunityPostPage;
