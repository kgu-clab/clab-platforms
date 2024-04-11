import { Suspense } from 'react';
import Content from '@components/common/Content/Content';
import MainNoticeSection from '@components/main/MainNoticeSection/MainNoticeSection';
import MainBanner from '@components/main/MainBanner/MainBanner';
import BirthdaySection from '@components/main/BirthdaySection/BirthdaySection';
import BlogSection from '@components/main/BlogSection/BlogSection';
import OrganizationNewsSection from '@components/main/OrganizationNewsSection/OrganizationNewsSection';
import { BoardSection } from '@components/community/BoardSection';
import {
  HireBoard,
  NewsBoard,
  NoticeBoard,
  QnABoard,
} from '@components/community/Board';

const MainPage = () => {
  return (
    <Content>
      <Suspense>
        <MainNoticeSection />
      </Suspense>
      <Suspense>
        <MainBanner />
      </Suspense>
      <Suspense>
        <OrganizationNewsSection />
      </Suspense>
      <BoardSection>
        <Suspense>
          <NoticeBoard />
        </Suspense>
        <Suspense>
          <QnABoard />
        </Suspense>
      </BoardSection>
      <Suspense>
        <BirthdaySection />
      </Suspense>
      <Suspense>
        <BlogSection />
      </Suspense>
      <BoardSection>
        <Suspense>
          <NewsBoard />
        </Suspense>
        <Suspense>
          <HireBoard />
        </Suspense>
      </BoardSection>
    </Content>
  );
};

export default MainPage;
