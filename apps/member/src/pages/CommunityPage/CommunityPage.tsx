import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import {
  FreeBoard,
  GraduatedBoard,
  HireBoard,
  NewsBoard,
  NoticeBoard,
  QnABoard,
} from '@components/community/Board';
import { BoardSection } from '@components/community/BoardSection';
import { CommunityBoardCollectSection } from '@components/community/CommunityBoardCollectSection';
import CommunityWriteButton from '@components/community/CommunityWriteButton/CommunityWriteButton';

import { PATH_NAME } from '@constants/path';

const CommunityPage = () => {
  return (
    <Content>
      <Header title={PATH_NAME.COMMUNITY}>
        <CommunityWriteButton />
      </Header>
      <BoardSection>
        <Suspense>
          <NoticeBoard />
        </Suspense>
        <Suspense>
          <FreeBoard />
        </Suspense>
        <Suspense>
          <QnABoard />
        </Suspense>
        <Suspense>
          <GraduatedBoard />
        </Suspense>
        <Suspense>
          <NewsBoard />
        </Suspense>
        <Suspense>
          <HireBoard />
        </Suspense>
      </BoardSection>
      <Suspense>
        <CommunityBoardCollectSection />
      </Suspense>
    </Content>
  );
};
export default CommunityPage;
