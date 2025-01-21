import PageLayout from '@/app/PageLayout';

import { Form } from './sections';

export default function ApplicationForm() {
  return (
    <PageLayout
      nav
      footer
      className="flex min-h-screen flex-col items-center overflow-hidden break-keep px-12 py-28 text-center"
    >
      <h1 className="mb-4 text-4xl font-bold md:text-5xl">지원서</h1>
      <p className="text-clab-dark-yellow mb-8 text-lg font-bold md:text-xl">
        모든 항목은 평가에 반영되므로 정성껏 작성 부탁드려요.
      </p>
      <Form />
    </PageLayout>
  );
}
