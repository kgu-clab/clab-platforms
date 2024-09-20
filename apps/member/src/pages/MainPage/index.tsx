import { Suspense } from 'react';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import ActivityPhotoBanner from '@components/common/ActivityPhotoBanner/ActivityPhotoBanner';
import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import {
  HireBoard,
  NewsBoard,
  NoticeBoard,
  QnABoard,
} from '@components/community/Board';
import { BoardSection } from '@components/community/BoardSection';

import { ErrorBoundary } from '@suspensive/react';

import { BirthdaySection } from './components/BirthdaySection';
import { BlogSection } from './components/BlogSection';
import { NoticeSection } from './components/NoticeSection';
import { OrganizationNewsSection } from './components/OrganizationNewsSection';

export default function MainPage() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
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
                <QnABoard />
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
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
