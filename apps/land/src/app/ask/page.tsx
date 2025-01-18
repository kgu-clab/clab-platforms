import PageLayout from '@/app/PageLayout';

import { ContactInfoSection, ExecutiveSection } from './sections';

export default function Apply() {
  return (
    <PageLayout
      nav
      footer
      className="flex min-h-screen flex-col space-y-12 p-12 !pt-28 md:p-20"
    >
      <div className="space-y-2">
        <h1 className="text-left text-6xl font-bold">Any Questions?</h1>
        <p>언제든지 편하게 연락해주세요. 질문과 의견을 환영해요!</p>
      </div>
      <ContactInfoSection />
      <ExecutiveSection />
    </PageLayout>
  );
}
