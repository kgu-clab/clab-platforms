import { Suspense } from 'react';

import { Grid } from '@clab-platforms/design-system';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import { Section } from '@components/common/Section';

import { ActivityGroupSection } from './components/ActivityGroupSection';
import { HistorySection } from './components/HistorySection';
import { MembershipHistorySection } from './components/MembershipHistorySection';
import { ProfileSection } from './components/ProfileSection';

export default function MyPage() {
  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
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

          <Suspense>
            <HistorySection category="나의 문의" />
          </Suspense>
        </Content>
      </Suspense>
    </QueryErrorBoundary>
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
      <Section className="h-32 animate-pulse">
        <Section.Header title="나의 문의" />
      </Section>
    </Content>
  );
};
