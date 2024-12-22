import PageLayout from '@/app/PageLayout';
import { SugangLayout } from '@/widgets/sugang/ui';

export default function SugangPage() {
  return (
    <PageLayout nav className="m-0 flex h-[calc(100vh-3.5rem)] w-screen p-0">
      <SugangLayout />
    </PageLayout>
  );
}
