import PageLayout from '@/app/PageLayout';

import { ApplyCheckSection } from './sections';

export default function Result() {
  return (
    <PageLayout
      nav
      footer
      className="flex min-h-screen flex-col overflow-hidden"
    >
      <ApplyCheckSection />
    </PageLayout>
  );
}
