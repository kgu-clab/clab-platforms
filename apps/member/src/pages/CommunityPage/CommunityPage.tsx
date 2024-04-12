import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@clab/design-system';

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
import CommunityBoardCollectSection from '@components/community/CommunityBoardCollectSection/CommunityBoardCollectSection';

import { PATH } from '@constants/path';

const CommunityPage = () => {
  const navigate = useNavigate();

  return (
    <Content>
      <Header title={'커뮤니티'}>
        <Button size="sm" onClick={() => navigate(PATH.COMMUNITY_WRITE)}>
          글쓰기
        </Button>
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
