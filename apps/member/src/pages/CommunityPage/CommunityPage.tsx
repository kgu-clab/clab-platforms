import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import {
  BoardSkeleton,
  DevelopmentQnABoard,
  FreeBoard,
  HireBoard,
  InformationReviewsBoard,
  NewsBoard,
  NoticeBoard,
} from '@components/community/Board';
import { HotBoard } from '@components/community/Board/Board';
import { BoardSection } from '@components/community/BoardSection';
import {
  CommunityBoardCollectSection,
  CommunityBoardCollectSectionSkeleton,
} from '@components/community/CommunityBoardCollectSection';
import CommunityWriteButton from '@components/community/CommunityWriteButton/CommunityWriteButton';

import { PATH_NAME } from '@constants/path';

const CommunityPage = () => {
  return (
    <Content>
      <Header title={PATH_NAME.COMMUNITY}>
        <CommunityWriteButton />
      </Header>
      <Suspense fallback={<BoardSkeleton />}>
        <HotBoard />
      </Suspense>
      <BoardSection>
        <Suspense fallback={<BoardSkeleton />}>
          <NoticeBoard />
        </Suspense>
        <Suspense fallback={<BoardSkeleton />}>
          <FreeBoard />
        </Suspense>
        <Suspense fallback={<BoardSkeleton />}>
          <DevelopmentQnABoard />
        </Suspense>
        <Suspense fallback={<BoardSkeleton />}>
          <InformationReviewsBoard />
        </Suspense>
        <Suspense fallback={<BoardSkeleton />}>
          <NewsBoard />
        </Suspense>
        <Suspense fallback={<BoardSkeleton />}>
          <HireBoard />
        </Suspense>
      </BoardSection>
      <Suspense fallback={<CommunityBoardCollectSectionSkeleton />}>
        <CommunityBoardCollectSection />
      </Suspense>
    </Content>
  );
};
export default CommunityPage;
