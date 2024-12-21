import { Suspense } from 'react';

import ActivityPhotoBanner from '@components/common/ActivityPhotoBanner/ActivityPhotoBanner';
import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import {
  DevelopmentQnABoard,
  HireBoard,
  NewsBoard,
  NoticeBoard,
} from '@components/community/Board';
import { BoardSection } from '@components/community/BoardSection';

import { BirthdaySection } from './components/BirthdaySection';
import { BlogSection } from './components/BlogSection';
import { NoticeSection } from './components/NoticeSection';
import { OrganizationNewsSection } from './components/OrganizationNewsSection';

export default function MainPage() {
  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Suspense>
          <NoticeSection />
        </Suspense>

        <Suspense>
          <ActivityPhotoBanner />
        </Suspense>

        <Suspense>
          <OrganizationNewsSection />
        </Suspense>

        <Suspense>
          <BoardSection>
            <NoticeBoard />
            <DevelopmentQnABoard />
          </BoardSection>
        </Suspense>

        <Suspense>
          <BirthdaySection />
        </Suspense>

        <Suspense>
          <BlogSection />
        </Suspense>

        <Suspense>
          <BoardSection>
            <NewsBoard />
            <HireBoard />
          </BoardSection>
        </Suspense>
      </Content>
    </QueryErrorBoundary>
  );
}
