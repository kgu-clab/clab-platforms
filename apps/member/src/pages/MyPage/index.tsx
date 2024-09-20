import { Suspense } from 'react';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { Grid } from '@clab-platforms/design-system';

import Content from '@components/common/Content/Content';
import { Section } from '@components/common/Section';

import { ErrorBoundary } from '@suspensive/react';

import { ActivityGroupSection } from './components/ActivityGroupSection';
import { HistorySection } from './components/HistorySection';
import { MembershipHistorySection } from './components/MembershipHistorySection';
import { ProfileSection } from './components/ProfileSection';

export default function MyPage() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallback={<></>}>
          <Suspense fallback={<Skeleton />}>
            <Content>
              <Suspense>
                <ProfileSection />
              </Suspense>
              <Suspense>
                <HistorySection category="지난 알림" />
              </Suspense>
              <Grid gap="md" className="md:grid-cols-2">
                <MembershipHistorySection />
                <HistorySection category="도서 대출 내역" />
              </Grid>
              <Suspense>
                <ActivityGroupSection />
              </Suspense>
              <Suspense>
                <Grid gap="md" className="md:grid-cols-2">
                  <HistorySection category="나의 게시글" />
                  <HistorySection category="나의 댓글" />
                </Grid>
              </Suspense>
            </Content>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

const Skeleton = () => {
  return (
    <Content>
      <Section className="h-96 animate-pulse">
        <Section.Header title="나의 정보" />
      </Section>
      <Section className="h-32 animate-pulse">
        <Section.Header title="지난 알림" />
      </Section>
      <Section className="h-32 animate-pulse">
        <Section.Header title="나의 게시글" />
      </Section>
      <Section className="h-32 animate-pulse">
        <Section.Header title="나의 댓글" />
      </Section>
    </Content>
  );
};
