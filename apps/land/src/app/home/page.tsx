import PageLayout from '@/app/PageLayout';

import {
  ActivitySection,
  DescriptionSection,
  HeroSection,
  PartSection,
  RecruitmentSection,
  ReviewSection,
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
      <PartSection />
      <ActivitySection />
      <ReviewSection />
      <SupportSection />
      <RecruitmentSection />
    </PageLayout>
  );
}
