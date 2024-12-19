import PageLayout from '@/app/PageLayout';

import {
  ActivitySection,
  DescriptionSection,
  HeroSection,
  RecruitmentSection,
  SupportSection,
  ValueSection,
} from './sections';

export default function Home() {
  return (
    <PageLayout
      nav
      footer
      className="flex min-h-screen flex-col overflow-hidden"
    >
      <HeroSection />
      <DescriptionSection />
      <ValueSection />
      <ActivitySection />
      <SupportSection />
      <RecruitmentSection />
    </PageLayout>
  );
}
