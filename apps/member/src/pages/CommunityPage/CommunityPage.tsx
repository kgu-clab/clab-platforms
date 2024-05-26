import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import {
  BoardSkeleton,
  FreeBoard,
  GraduatedBoard,
  HireBoard,
  NewsBoard,
  NoticeBoard,
  QnABoard,
} from '@components/community/Board';
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
      <BoardSection>
        <Suspense fallback={<BoardSkeleton />}>
          <NoticeBoard />
        </Suspense>
        <Suspense fallback={<BoardSkeleton />}>
          <FreeBoard />
        </Suspense>
        <Suspense fallback={<BoardSkeleton />}>
          <QnABoard />
        </Suspense>
        <Suspense fallback={<BoardSkeleton />}>
          <GraduatedBoard />
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
