import PageLayout from '@/app/PageLayout';

import { ResultSection } from './sections';

export default function Result() {
  return (
    <PageLayout
      nav
      footer
      className="flex min-h-screen flex-col overflow-hidden"
    >
      <ResultSection />
    </PageLayout>
  );
}
