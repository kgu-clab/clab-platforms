import PageLayout from '@/app/PageLayout';

import {
  ApplyProcessSection,
  FAQSection,
  NowApplySection,
  RecruitmentNoticeSection,
} from './sections';

export default function Apply() {
  return (
    <PageLayout
      nav
      footer
      className="flex min-h-screen flex-col overflow-hidden"
    >
      <h1 className="pt-24 text-center text-6xl font-bold md:pl-32 md:!text-start">
        Join To <span className="text-clab-yellow">C-Lab!</span>
      </h1>
      <ApplyProcessSection />
      <RecruitmentNoticeSection />
      <FAQSection />
      <NowApplySection />
    </PageLayout>
  );
}
